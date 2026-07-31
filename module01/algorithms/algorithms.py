#question 1
def getOnlyEvens(arr):
    count=0
    even_indexes=[]
    for num,i in enumerate(arr):
        if num%2==0 and i%2==0:
            even_indexes.append(i)
    print(even_indexes)
            
    
getOnlyEvens([1, 2, 3, 6, 4, 8])# test 1
getOnlyEvens([0, 1, 2, 3, 4])#test 2

#question 2

def reverseCompare(number):
    num_str=str(number)
    rev_str=''
    for num in reversed(num_str):
       rev_str=rev_str+num
    if number>int(rev_str):
        print('ok')
    else:
        print('not ok')
reverseCompare(72)#test 1
reverseCompare(23)#test 2


#question 3

def returnFactorial(number):
    factorial=1
    if number==0:
        return 0
    for i in reversed(range(1,number+1)):
        factorial*=i
    return factorial

print(returnFactorial(10)) #outputs 12
print(returnFactorial(6)) #outputs 720
print(returnFactorial(0)) #outputs 1
        

#question 4
def checkMeera(arr):
    flag=False
    mul=0
    for num in arr:
       if num*2 in arr:
           if num==0:
               continue #because it os always 0 
           mul=num
           flag=True
           break
    if flag:
         print(f'I am NOT a Meera array” because {num} * 2 is {num*2}')
    else:
        print('“I am a Meera array”')
       
checkMeera([10, 4, 0, 5])
checkMeera([7, 4, 9])
checkMeera([1, -6, 4, -3])

#question 5
def isDual(arr):
    count =0
    for num in arr:
        for n in arr:
            if n==num:
                count+=1
        if not count==2:
            return 0 
        else :
            count=0
    return 1
print(isDual([1, 2, 1, 3, 3, 2])  )     
print(isDual([3, 1, 1, 2, 2,3])  )     
print(isDual([2, 5, 2, 5, 5])  )     


#question 6
def digitalClock(seconds):
    hour=0
    minutes=0
    sec=0
    hour=int(seconds/3600)
    minutes=int((seconds%3600)/60)
    sec=seconds-((hour*3600)+(minutes*60))
    while (hour>=24):# making 24 hour format by looping on it  
        hour=hour-24
    return f'{hour:02d}:{minutes:02d}:{sec:02d}'
print(digitalClock(61201))
print(digitalClock(87000))
print(digitalClock(5025))