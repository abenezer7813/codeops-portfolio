stock={}
try:
    with open('./day03/stock.txt' )as f:
        for line in f:
            item,quantity=line.strip().split(',')
            stock[item]=int(quantity)
except FileNotFoundError:
    print('file does not exist ')
def adjust(item,amount):
    print(stock.get(item))
    stock[item]=int(stock.get(item))+ amount
    print(stock["MedicineB"])
adjust("MedicineB",-700)
print(stock)
low_quantity=[item for item ,quantity in stock.items() if quantity<10]
print(low_quantity)
try :
    with open("./day03/stock.txt",'w') as f:
        for item,quantity in stock.items():
            f.write(f"{item} ,{quantity}\n")
except FileNotFoundError:
    print("file does not exist")
