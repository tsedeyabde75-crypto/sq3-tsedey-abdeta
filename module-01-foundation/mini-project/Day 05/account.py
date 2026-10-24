class Account:
    """Represents a bank account for Addis Bank - Account Management System."""

    def __init__(self, owner, number, balance=0):
        self.owner = owner
        self.account_number = number
        self._balance = balance

    @property
    def balance(self):
        """Read-only property for accessing the private balance."""
        return self._balance

    def deposit(self, amount):
        """Deposits funds into the account after validating the amount."""
        if amount <= 0:
            raise ValueError("Amount must be positive")
        self._balance += amount

    def withdraw(self, amount):
        """Withdraws funds from the account, rejecting overdrafts and invalid amounts."""
        if amount <= 0:
            raise ValueError("Amount must be positive")
        if amount > self._balance:
            raise ValueError("Insufficient funds: Overdrafts are not allowed")
        self._balance -= amount

    def statement(self):
        """Prints account details and current balance in ETB."""
        print(f"Account Statement | Owner: {self.owner} | Account No: {self.account_number} | Balance: {self._balance} ETB")


class SavingsAccount(Account):
    """A savings account that earns interest."""

    def __init__(self, owner, number, balance=0, rate=0.05):
        # Use super() to reuse the parent class setup
        super().__init__(owner, number, balance)
        self.rate = rate

    def add_interest(self):
        """Calculates interest and reuses the parent deposit method."""
        self.deposit(self.balance * self.rate)

    def statement(self):
        """Overridden method to label the account as a Savings Account."""
        print(f"[Savings] Account Statement | Owner: {self.owner} | Account No: {self.account_number} | Balance: {self._balance} ETB")


class CurrentAccount(Account):
    """A current account that allows an overdraft."""

    def __init__(self, owner, number, balance=0, overdraft=1000):
        # Use super() to reuse the parent class setup
        super().__init__(owner, number, balance)
        self.overdraft = overdraft

    def withdraw(self, amount):
        """Overridden method to allow withdrawal up to the overdraft limit."""
        if amount <= 0:
            raise ValueError("Amount must be positive")
        
        
        if amount > (self._balance + self.overdraft):
            raise ValueError(f"Insufficient funds: Overdraft limit of {self.overdraft} ETB exceeded")
            
        self._balance -= amount

    def statement(self):
        """Overridden method to label the account as a Current Account."""
        print(f"[Current] Account Statement | Owner: {self.owner} | Account No: {self.account_number} | Balance: {self._balance} ETB")