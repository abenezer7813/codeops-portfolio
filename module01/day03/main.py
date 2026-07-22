# #lists

# cities=["sheger","addis","hawssa","desse","sheger","addis","hawssa","desse"]
# # print(cities[3])
# # #negative indexing
# # print(cities[-2])
# # cities.sort(reverse=True)
# # print(cities)
# # for city in cities[0:5]:
# #     print(city)
# customer={
#     "name":"bena",
#     "gender":"male"
# }
# # print(customer.get("name"))
# # print(customer.get("phone"))#return non if does not exist
# # print('phone' in customer)#checking the existence 
# # city_set=set(cities)
# # print(city_set)
# # #set can operate union "|" intersection "&" and difference "-" on multiple collections

# with open('./day01/note.md') as file:
#  print(file.read())
# #try /except 
# # else   runs if no error is found 
# #
# try:
taransaction=[]
with open("./day03/transaction.txt")as f:
        for line in f:
            line=line.strip().split(',')
            
            taransaction.append({"name":line[0],"amount":line[1]})
print(taransaction)

# except :
#     FileNotFoundError 
#     print("file does not exist")
    
