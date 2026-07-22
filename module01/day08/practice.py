def binary_search(items,target):
    sorted_list =sorted(items)
    start=0
    end=len(sorted_list)-1
    print(sorted_list[end])
    iter=0
    while start<=end:
       iter+=1
       mid=int((start+end)/2)
       if sorted_list[mid]==target:
           print("target founded")
           return mid
       elif target<sorted_list[mid]:
            end=mid-1
       elif target>sorted_list[mid]:
            start=mid+1
       
    print(f"Target {target} not found after {iter} iteration(s).")
    return -1
