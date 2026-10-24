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
        """Read-only property for accessing the private balance."""
        return self._balance

    def deposit(self, amount):
        """Deposits funds into the account after validating the amount."""
        if amount <= 0:
            raise ValueError("Amount must be positive")
        self._balance += amount
        self.history.append(('deposit', amount))
        self._notify(f"+{amount} ETB deposited. New balance: {self._balance} ETB")

    def withdraw(self, amount):
        """Withdraws funds from the account, rejecting overdrafts and invalid amounts."""
        if amount <= 0:
            raise ValueError("Amount must be positive")
        if amount > self._balance:
            raise ValueError("Insufficient funds: Overdrafts are not allowed")
        self._balance -= amount
        self.history.append(('withdraw', amount))
        self._notify(f"-{amount} ETB withdrawn. New balance: {self._balance} ETB")

    def undo_last(self):
        """Pops the most recent transaction from the history stack and reverses its effect."""
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
        """Prints account details and current balance in ETB."""
        print(f"Account Statement | Owner: {self.owner} | Account No: {self.account_number} | Balance: {self._balance} ETB")


class SavingsAccount(Account):
    """A savings account that earns interest."""

    def __init__(self, owner, number, balance=0, rate=None):
        super().__init__(owner, number, balance)
        config = BankConfig()
        self.rate = rate if rate is not None else config.interest_rate

    def add_interest(self):
        """Calculates interest and reuses the parent deposit method."""
        interest = self.balance * self.rate
        self.deposit(interest)

    def statement(self):
        """Overridden method to label the account as a Savings Account."""
        print(f"[Savings] Account Statement | Owner: {self.owner} | Account No: {self.account_number} | Balance: {self._balance} ETB")


class CurrentAccount(Account):
    """A current account that allows an overdraft."""

    def __init__(self, owner, number, balance=0, overdraft=None):
        super().__init__(owner, number, balance)
        config = BankConfig()
        self.overdraft = overdraft if overdraft is not None else config.overdraft_limit

    def withdraw(self, amount):
        """Overridden method to allow withdrawal up to the overdraft limit."""
        if amount <= 0:
            raise ValueError("Amount must be positive")
        
        if amount > (self._balance + self.overdraft):
            raise ValueError(f"Insufficient funds: Overdraft limit of {self.overdraft} ETB exceeded")
            
        self._balance -= amount
        self.history.append(('withdraw', amount))
        self._notify(f"-{amount} ETB withdrawn. New balance: {self._balance} ETB")

    def statement(self):
        """Overridden method to label the account as a Current Account."""
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


class AccountRegistry:
    """Stores and manages multiple accounts efficiently using linear structures."""

    def __init__(self):
        self.by_number = {}  
        self.order = []      

    def add(self, acc):
        """Adds an account to the registry."""
        self.by_number[acc.account_number] = acc
        self.order.append(acc.account_number)

    def find(self, number):
        """Finds an account by number in O(1) time."""
        return self.by_number.get(number)

    def list_all(self):
        """Returns all registered accounts in insertion order."""
        return [self.by_number[num] for num in self.order]