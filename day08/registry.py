from typing import override

from day08.practice import binary_search


class Account:
    def __init__(self,owner,account_number,balance=0):
        self.owner=owner
        self.account_number=account_number
        self.__balance=balance
        self._observers=[]
        self.history=[]
    @property
    def balance(self):
        return self.__balance
    
    
    def deposit(self,amount):
        if amount<=0:
            raise ValueError("amount cannot be below zero")
        self.__balance+=amount
        self._notify(f"Deposited {amount} ETB. New balance: {self.__balance} ETB")
        self.history.append(("deposit", amount))

    def withdraw (self,amount):
        if amount <=0:
            raise ValueError("amount cannot be below zero")
        if amount>self.__balance:
            raise ValueError("you have low balance")
        self.__balance-=amount
        self._notify(f"Withdrew {amount} ETB. New balance: {self.__balance} ETB")
        self.history.append(("withdraw", amount))
    def statement(self):
        return f"Account owner is {self.owner} \nAccount Number {self.account_number}\nCurrent Balance {self.balance} ETB"
    def subscribe(self,observer):
        self._observers.append(observer)
    def _notify(self,message):
        for observer in self._observers:
            observer.update(self,message)
    def undo_last(self):
        last_tx=0
        if  self.history:
         last_tx=self.history.pop()
         if last_tx[0]=='deposit':
             self.__balance-=last_tx[1]
         elif last_tx[0]=='withdraw':
             self.__balance+=last_tx[1]
         else :
             raise ValueError('Unknown transaction')
        else :
            raise ValueError ("No transaction")
        
   
   

class  SavingAccount(Account):
       def __init__(self, owner, account_number, balance=0):
           super().__init__(owner, account_number, balance)
           #self.rate=rate
       def add_interest(self):
           config=BankConfig()
           self.deposit(self.balance *config.interest_rate)

       @override
       def statement(self):
        return f"Account owner is {self.owner} \nAccount Number {self.account_number}\nAccount Type SavingAccount\nCurrent Balance {self.balance} ETB"

class CurrentAccount(Account):
    def __init__(self, owner, account_number,balance=0):
        super().__init__(owner, account_number, balance)
        #self.overdraft_limit=overdraft_limit
    
    @override
    def withdraw(self, amount):
         config=BankConfig()
         if amount > self.balance + config.overdraft_limit:
             raise ValueError("The amount is more than the the permitted overdraft limit")
         self._Account__balance-=amount
         self._notify(f"Withdrew {amount} ETB. New balance: {self._Account__balance} ETB")
         self.history.append(("withdraw", amount))

    @override
    def statement(self):
        return f"Account owner is {self.owner} \nAccount Number {self.account_number}\nAccount Type CurrentAcount\nCurrent Balance {self.balance} ETB"
         

class AccountFactory:
    @staticmethod
    def create(kind,owner,number ,balance=0):
        if kind=='savings':
            return SavingAccount(owner,number,balance)
        elif kind =='current':
            return CurrentAccount(owner,number,balance)
        else:
            raise ValueError("Unknown account kind")
class SMSAlert:
    def update(self,account,message):
        print(f'SMS to {account.owner}: {message}')
class AuditLog:
    def update(self, account, message):
        print(f"[AUDIT] Account {account.account_number}: {message}")

class BankConfig:
 _instance = None
 def __new__(cls):
  if cls._instance is None:
   cls._instance = super().__new__(cls)
   cls._instance.interest_rate = 0.05
   cls._instance.overdraft_limit = 1000
  return cls._instance
 

class AccountRegistry:
    def __init__(self):
        self.by_number = {} 
        self.order = [] 
    def add(self, acc):
        self.by_number[acc.account_number] = acc
        self.order.append(acc.account_number)
    def find(self, number):
        return self.by_number.get(number) 
    def list_all(self):
        result = []
        for num in self.order:
          account = self.by_number[num]
          result.append(account)
        return result
   
    def top_by_balance(self, n=5):
        accts = sorted(self.by_number.values(),
        key=lambda a: a.balance, reverse=True)
        return accts[:n]
    def find_by_number(self, number):
        nums = sorted(self.by_number) # sorted keys
        i = binary_search(nums, number)
        return self.by_number[nums[i]] if i >= 0 else None 
    sum=0
    def total_transactions(self,number):
        account=self.find_by_number(number)
        if not account:
            return 0
        tx_history=account.history
        def _sum_recursive(tx_history):
            if not tx_history:
                return 0
            return tx_history[0]+_sum_recursive(tx_history[1:])
        return _sum_recursive(tx_history) 
         
        

account1=Account("abenezer",1000286,1000)
account1.deposit(2)
account2=Account("Tariku",1000360,2000)
saving_account=AccountFactory.create('savings',"Tariku",1000360,2000)
current_account=AccountFactory.create('current',"chala",1000360,2000,)

#checking overdraft
current_account.withdraw(1000) 
print(current_account.balance)
print(f'history {current_account.history} and balance {current_account.balance}')
current_account.undo_last()
print(f'history after undo call{current_account.history} and balance   {current_account.balance}')

#printing statements
accounts=[account1,account2,current_account,saving_account]
for account in accounts:
    print(f"{account.statement()}\n")
