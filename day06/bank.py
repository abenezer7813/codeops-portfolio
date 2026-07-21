from abc import ABC, abstractmethod


class Account:
    def __init__(self, owner, account_number, balance=0):
        self.owner = owner
        self.account_number = account_number
        self._balance = balance
        self._observers = []

    @property
    def balance(self):
        return self._balance

    def subscribe(self, observer):
        self._observers.append(observer)

    def _notify(self, message):
        for observer in self._observers:
            observer.notify(self, message)

    def deposit(self, amount):
        if amount < 0:
            raise ValueError("Deposit amount cannot be negative.")
        self._balance += amount
        self._notify(f"Deposit of {amount} — new balance {self._balance}")
        return self._balance

    def withdraw(self, amount):
        if amount < 0:
            raise ValueError("Withdrawal amount cannot be negative.")
        if amount > self._balance:
            raise ValueError("Insufficient funds: withdrawal exceeds balance.")
        self._balance -= amount
        self._notify(f"Withdrawal of {amount} — new balance {self._balance}")
        return self._balance

    def statement(self):
        return f"[Account] {self.owner} ({self.account_number}): balance = {self.balance}"

    def __repr__(self):
        return f"{self.__class__.__name__}(owner={self.owner!r}, account_number={self.account_number!r}, balance={self.balance})"


class SavingsAccount(Account):
    def __init__(self, owner, account_number, balance=0, rate=0.05):
        super().__init__(owner, account_number, balance)
        self.rate = rate

    def add_interest(self):
        interest = self.balance * self.rate
        self.deposit(interest)
        return interest

    def statement(self):
        return f"[Savings] {self.owner} ({self.account_number}): balance = {self.balance}, rate = {self.rate:.2%}"


class CurrentAccount(Account):
    def __init__(self, owner, account_number, balance=0, overdraft=0):
        super().__init__(owner, account_number, balance)
        self.overdraft = overdraft

    def withdraw(self, amount):
        if amount < 0:
            raise ValueError("Withdrawal amount cannot be negative.")
        if amount > self._balance + self.overdraft:
            raise ValueError("Insufficient funds: withdrawal exceeds balance and overdraft limit.")
        self._balance -= amount
        self._notify(f"Withdrawal of {amount} — new balance {self._balance}")
        return self._balance

    def statement(self):
        return (f"[Current] {self.owner} ({self.account_number}): balance = {self.balance}, "
                f"overdraft limit = {self.overdraft}")


class AlertObserver(ABC):
    @abstractmethod
    def notify(self, account, message):
        ...


class SMSAlert(AlertObserver):
    def __init__(self, phone_number):
        self.phone_number = phone_number

    def notify(self, account, message):
        print(f"[SMS to {self.phone_number}] {account.owner}: {message}")


class EmailAlert(AlertObserver):
    def __init__(self, email):
        self.email = email

    def notify(self, account, message):
        print(f"[Email to {self.email}] {account.owner}: {message}")


class AlertService:
    @staticmethod
    def attach_sms(account, phone_number):
        observer = SMSAlert(phone_number)
        account.subscribe(observer)
        return observer

    @staticmethod
    def attach_email(account, email):
        observer = EmailAlert(email)
        account.subscribe(observer)
        return observer


class AccountFactory:
    _REGISTRY = {
        "savings": SavingsAccount,
        "current": CurrentAccount,
        "basic": Account,
    }

    @classmethod
    def create(cls, kind, owner, account_number, balance=0, **kwargs):
        try:
            account_cls = cls._REGISTRY[kind]
        except KeyError:
            raise ValueError(f"Unknown account kind: {kind!r}. Valid kinds: {list(cls._REGISTRY)}")
        return account_cls(owner, account_number, balance, **kwargs)

class AccountRegistry:
    def __init__(self):
        self.accounts={}
    def add(self,account):
        self.accounts[account.account_number]=account
        return account
    def find(self,account):
        return self.accounts[account]
    def list_all(self):
        return self.accounts.so


if __name__ == "__main__":
    savings = AccountFactory.create("savings", "Selam", "SAV001", 200, rate=0.05)
    current = AccountFactory.create("current", "Dawit", "CUR001", 50, overdraft=100)
    basic = AccountFactory.create("basic", "Abenezer", "ACC001", 100)

    AlertService.attach_sms(savings, "+251-900-000-000")
    AlertService.attach_email(current, "dawit@example.com")

    accounts = [basic, savings, current]

    basic.deposit(50)
    savings.add_interest()
    current.withdraw(120)

    print()
    for acc in accounts:
        print(acc.statement())
