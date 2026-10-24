from collections import deque


class BankConfig:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.interest_rate = 0.05
            cls._instance.overdraft_limit = 1000
        return cls._instance


class SMSAlert:
    def update(self, event):
        print(f"[TeleBirr SMS] {event}")


class AuditLog:
    def update(self, event):
        print(f"[Log] {event}")


class Account:
    """Represents a bank account for Addis Bank - Account Management System."""

    def __init__(self, owner, number, balance=0):
        self.owner = owner
        self.account_number = number
        self._balance = balance
        self._observers = []
        self.history = []

    def subscribe(self, obs):
        self._observers.append(obs)

    def _notify(self, event):
        for obs in self._observers:
            obs.update(event)

    @property
    def balance(self):
        return self._balance

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        self._balance += amount
        self.history.append(('deposit', amount))
        self._notify(f"+{amount} ETB deposited. New balance: {self._balance} ETB")

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        if amount > self._balance:
            raise ValueError("Insufficient funds: Overdrafts are not allowed")
        self._balance -= amount
        self.history.append(('withdraw', amount))
        self._notify(f"-{amount} ETB withdrawn. New balance: {self._balance} ETB")

    def undo_last(self):
        if not self.history:
            raise ValueError("No transaction history to undo")
        
        transaction_type, amount = self.history.pop()
        
        if transaction_type == 'deposit':
            self._balance -= amount
            self._notify(f"Undo deposit: -{amount} ETB. New balance: {self._balance} ETB")
        elif transaction_type == 'withdraw':
            self._balance += amount
            self._notify(f"Undo withdrawal: +{amount} ETB. New balance: {self._balance} ETB")

    def statement(self):
        print(f"Account Statement | Owner: {self.owner} | Account No: {self.account_number} | Balance: {self._balance} ETB")


class SavingsAccount(Account):
    """A savings account that earns interest."""

    def __init__(self, owner, number, balance=0, rate=None):
        super().__init__(owner, number, balance)
        config = BankConfig()
        self.rate = rate if rate is not None else config.interest_rate

    def add_interest(self):
        interest = self.balance * self.rate
        self.deposit(interest)

    def statement(self):
        print(f"[Savings] Account Statement | Owner: {self.owner} | Account No: {self.account_number} | Balance: {self._balance} ETB")


class CurrentAccount(Account):
    """A current account that allows an overdraft."""

    def __init__(self, owner, number, balance=0, overdraft=None):
        super().__init__(owner, number, balance)
        config = BankConfig()
        self.overdraft = overdraft if overdraft is not None else config.overdraft_limit

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        
        if amount > (self._balance + self.overdraft):
            raise ValueError(f"Insufficient funds: Overdraft limit of {self.overdraft} ETB exceeded")
            
        self._balance -= amount
        self.history.append(('withdraw', amount))
        self._notify(f"-{amount} ETB withdrawn. New balance: {self._balance} ETB")

    def statement(self):
        print(f"[Current] Account Statement | Owner: {self.owner} | Account No: {self.account_number} | Balance: {self._balance} ETB")


class AccountFactory:
    """Centralizes account creation."""

    @staticmethod
    def create(kind, owner, number, balance=0):
        kind = kind.lower()
        if kind == "savings":
            return SavingsAccount(owner, number, balance)
        elif kind == "current":
            return CurrentAccount(owner, number, balance)
        else:
            raise ValueError(f"Unknown type: {kind}")


def binary_search(items, target):
    lo, hi = 0, len(items) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if items[mid] == target:
            return mid
        elif items[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1


class AccountRegistry:
    """Stores and manages multiple accounts efficiently using linear structures."""

    def __init__(self):
        self.by_number = {}
        self.order = []

    def add(self, acc):
        self.by_number[acc.account_number] = acc
        self.order.append(acc.account_number)

    def find(self, number):
        return self.by_number.get(number)

    def list_all(self):
        return [self.by_number[num] for num in self.order]

    def top_by_balance(self, n=5):
        accts = sorted(
            self.by_number.values(),
            key=lambda a: a.balance,
            reverse=True
        )
        return accts[:n]

    def find_by_number(self, number):
        nums = sorted(self.by_number.keys())
        i = binary_search(nums, number)
        return self.by_number[nums[i]] if i >= 0 else None

    def total_transactions(self, number):
        acc = self.find(number)
        if not acc:
            return 0

        def _rec_sum(history):
            if not history:
                return 0
            _, amount = history[0]
            return amount + _rec_sum(history[1:])

        return _rec_sum(acc.history)



class Branch:
    """Models a bank branch hierarchy tree node."""

    def __init__(self, name):
        self.name = name
        self.children = []  
        self.accounts = []  

    def total_balance(self):
        """Recursively calculates total balance of this branch and all sub-branches."""
        total = sum(a.balance for a in self.accounts)
        for child in self.children:
            total += child.total_balance()
        return total


def bfs(transfers, start):
    """
    Breadth-First Search over a transfers graph (adjacency list mapping account -> list of recipients).
    Returns a set of all accounts reachable from the starting account.
    """
    if start not in transfers:
        return {start}

    seen = {start}
    q = deque([start])

    while q:
        node = q.popleft()
        for neighbor in transfers.get(node, []):
            if neighbor not in seen:
                seen.add(neighbor)
                q.append(neighbor)

    return seen