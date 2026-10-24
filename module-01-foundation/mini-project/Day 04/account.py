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