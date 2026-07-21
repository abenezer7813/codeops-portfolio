
# def linear_search(items ,target):
#     count=0
#     for i ,value in enumerate(items):
#         if value==target:
#             print(f'target founded on index {i}')
#             break
#         count+=1
#         print(f"iteration {count}")

numbers=[43,53,56,256,6,632,24,43]
# linear_search(numbers,6)

def binary_search(items,target):
    sorted_list =sorted(items)
    
    start=0
    end=len(sorted_list)-1
    print(sorted_list[end])
    iter=0
    while start<end:
       print("i1")
       mid=int((start+end)/2)
       if sorted_list[mid]==target:
           print("target founded")
           break
       elif target<sorted_list[mid]:
            end=mid
       elif target>sorted_list[mid]:
            start=mid
    iter+=1
    print(f"iteration  {iter}")

binary_search(numbers,24)