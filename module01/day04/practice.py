class Book:
    def __init__(self,title,author,pages):
        self.title=title
        self.author=author
        self.pages=pages
    def describe(self):
        print(f"{self.title} by {self.author}")

book1=Book("fikir","kebede",145)
book2=Book("emegua","chala",255)
book1.describe()

class Product:
    def __init__(self,name,price,quantity):
        self.name=name
        self.quantity=quantity
        self.price=price

    @property
    def quantity(self):
       return self.__quantity
    

    @quantity.setter
    def quantity(self,value):
        if value <0:
            raise ValueError("quantity can not be below zero")
        self.__quantity=value

    def restock(self,n):
        self.quantity+=n

    def sell(self,n):
        if self.quantity<n:
            print(f"{self.name } is out of stock ")
        else:
            self.quantity-=n

product1=Product("phone",45000,50)
product1.sell(70)
print(f"quantity after selling {product1.quantity}")
product2=Product("charger",500,100)
product3=Product("protector",1000,343)

#changing product 2 quantity
product2.sell(50)

print(f"quntity of product 2 was 100 now {product2.quantity}")
print(f"quntity of product 1 was 50  now {product1.quantity}")
print(f"quntity of product 3 was 343 now {product3.quantity}")