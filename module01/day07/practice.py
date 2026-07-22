#name big-o
# 1. List index
import time


arr = [10, 20, 30, 40, 50]
value = arr[2]

# Big-O: O(1)
# Accessing an element by its index takes constant time because

# 2. Single loop
arr = [10, 20, 30, 40, 50]

for item in arr:
    print(item)

#  O(n) because The loop visits every element exactly once.


# 3. Nested loop
arr = [10, 20, 30, 40, 50]

for i in arr:
    for j in arr:
        print(i, j)

# Big-O: O(n²)
# For each of the n elements in the outer loop
# the inner loop also runs n times.
# Total operations = n × n = n².
# 4. Dictionary lookup
student = {
    "name": "Alice",
    "age": 20,
    "grade": "A"
}

print(student["age"])

# Big-O: O(1) average case
# Why:
# Python dictionaries use a hash table.
# Looking up a key is usually constant time because
# the hash points directly to the stored value.
#
# Worst case: O(n) if many hash collisions occur,
# but average performance is O(1).

# 5. Binary search
def binary_search(arr, target):
    left, right = 0, len(arr) - 1

    while left <= right:
        mid = (left + right) // 2

        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1

# Big-O: O(log n)
# Why:
# Each iteration eliminates half of the remaining search space.
# The number of comparisons grows logarithmically with the input size.
# Binary search requires the array to be sorted.


#list vs dict lookup
account_list=[f'ACC-{i}' for i in range(1,100001)]


account_dict={i:f'ACC-{i}' for i in range(1,100001)}

#looking up ACC-99999
target = "ACC-99999"

# List lookup

start = time.perf_counter()

found = target in account_list

end = time.perf_counter()
print(f'list time {end-start:8f} seconds')

start = time.perf_counter()

found = target in account_dict

end = time.perf_counter()
print(f'dict time {end-start:8f} seconds')