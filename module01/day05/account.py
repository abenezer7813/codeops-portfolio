from typing import override


class Account:
    def __init__(self,owner,account_number,balance=0):
        self.owner=owner
        self.account_number=account_number
        self.__balance=balance
    @property
    def balance(self):
        return self.__balance
    
    def deposit(self,amount):
        if amount<=0:
            raise ValueError("amount cannot be below zero")
        self.__balance+=amount

    def withdraw (self,amount):
        if amount <=0:
            raise ValueError("amount cannot be below zero")
        if amount>self.__balance:
            raise ValueError("you have low balance")
        self.__balance-=amount
      
    def statement(self):
        return f"Account owner is {self.owner} \nAccount Number {self.account_number}\nCurrent Balance {self.balance} ETB"
class  savingAccount(Account):
       def __init__(self, owner, account_number,rate, balance=0):
           super().__init__(owner, account_number, balance)
           self.rate=rate
       def add_interest(self):
           self.deposit(self.balance * self.rate)

       @override
       def statement(self):
        return f"Account owner is {self.owner} \nAccount Number {self.account_number}\nAccount Type SavingAccount\nCurrent Balance {self.balance} ETB"

class currentAccount(Account):
    def __init__(self, owner, account_number, overdraft_limit,balance=0):
        super().__init__(owner, account_number, balance)
        self.overdraft_limit=overdraft_limit
    @override
    def withdraw(self, amount):
         if amount> self.balance+self.overdraft_limit:
             raise ValueError("The amount is more than the the permitted overdraft limit")
         self._Account__balance-=amount

    @override
    def statement(self):
        return f"Account owner is {self.owner} \nAccount Number {self.account_number}\nAccount Type CurrentAcount\nCurrent Balance {self.balance} ETB"
         


           
         
account1=Account("abenezer",1000286,1000)
account1.deposit(2)
account2=Account("Tariku",1000360,2000)
saving_account=savingAccount("Tariku",1000360,0.15,2000)
current_account=currentAccount("chala",1000360,300,2000,)

#checking overdraft
current_account.withdraw(2300) 
print(current_account.balance)

#printing statements
accounts=[account1,account2,current_account,saving_account]
for account in accounts:
    print(f"{account.statement()}\n")


