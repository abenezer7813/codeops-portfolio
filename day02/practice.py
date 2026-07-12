#Temperature label
#asking temperature
temperature=int(input("Please enter temperature in degree celsius\n") )

if temperature <15:
    print('cold')
elif 15 <= temperature <=28:
    print('warm')
else:
    print('hot')

#Receipt loop 
for i in range(1,11):
    print("Receipt  #"+str(i)) 
    #print(f"Receipt # {i}")

#Even numbers
for n in range(1,21):
    if n%2 ==0:
        print(n)

#Discount Function
def apply_discount(price,percent=10):
    return price- (price*percent/100) 
print(f"price after discount {apply_discount(100)}")
price=float(input("Enter price\n"))
print(f"price after discount {apply_discount(price)}")
#count down
count=5
while(count>=1):
    print(count)
    if count==1:
        print("LiftOff")
    count-=1