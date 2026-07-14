#1 Unique cities
cities =['addis ababa','dese','dire','addis ababa','hawassa','dese','arba minch','dire']
distinct_cities=set(cities)

print(f'distinct cities {distinct_cities}') 
print(f'Total distinct cities {len(distinct_cities)}') 
 
#2 Price report
grocery={
    "milk":1500,
     "bread":400,
     "rice":500,
     'meat':778,
     'water':1234
}
for key,value in grocery.items():
    print(f"{key} {value} ETB")

#3 Tax comprehension
prices = [100, 250, 400, 80]
tax_added_price=[price+price*15/100 for price in prices]
print(tax_added_price)

#4 Cheap items
low_prices=[price for price in prices if price<200]
print(low_prices)

#5 Write and Read
with open('./day03/notes.txt', 'a')as f:
     f.write('kebede \n')
     f.write('chala \n')
     f.write('abebe \n')
with open("./day03/notes.txt" )as f:
     for line in f:
          print(line.strip())  

#6 safe division 
divider=None

try:
  divider=int(input("Enter a number "))
  result=1000/divider
except ZeroDivisionError :
  print("Divider cannot be zero ,please enter number except zero ")
except ValueError:
  print('please enter only number ')
else:
  print(result)
finally:
  print('done')
  
  