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
    @property   
    def statement(self):
        print(f"Account owner is {self.owner} \nAccount Number {self.account_number}\nCurrent Balance {self.balance} ETB")
        
account1=Account("abenezer",1000286,1000)
account1.deposit(2)
account2=Account("Tariku",1000360,2000)
#account1.balance = 5000 
print(account1.balance)
print(account2.balance)
account1.statement



