import heapq
from collections import deque

# Exercise 1: Build a BST & In-Order Traversal

class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

def insert(root, value):
    if root is None:
        return Node(value)
    
    if value < root.value:
        root.left = insert(root.left, value)
    elif value > root.value:
        root.right = insert(root.right, value)
        
    return root

def in_order(node):
    if node is None:
        return
    in_order(node.left)
    print(node.value, end=" ")
    in_order(node.right)

# Test BST with account balances
balances = [1200.50, 450.00, 3100.25, 150.00, 890.00, 2100.00]
root = None

for balance in balances:
    root = insert(root, balance)

print("In-order traversal (sorted balances):")
in_order(root)
print("\n")


# Exercise 2: Tree Depth / Height

def height(node):
    """
    Returns the height/depth of a binary tree.
    An empty tree has height 0 (or -1 depending on convention; 
    here, empty node = 0, single node root = 1).
    """
    if node is None:
        return 0
    
    left_height = height(node.left)
    right_height = height(node.right)
    
    return 1 + max(left_height, right_height)

print(f"Tree height: {height(root)}\n")


# Exercise 3: Graph BFS


def bfs(graph, start):
    """
    Explores graph level-by-level using a queue.
    Returns the set of all reachable vertices.
    """
    seen = {start}
    q = deque([start])
    
    while q:
        node = q.popleft()
        for neighbor in graph.get(node, []):
            if neighbor not in seen:
                seen.add(neighbor)
                q.append(neighbor)
                
    return seen

# Sample transfers graph
transfers_graph = {
    "Almaz": ["Dawit", "Tigist"],
    "Dawit": ["Samuel"],
    "Tigist": ["Hanna"],
    "Samuel": ["Almaz"],
    "Hanna": [],
    "Isolated_Account": []
}

reachable_bfs = bfs(transfers_graph, "Almaz")
print(f"Reachable accounts from Almaz (BFS): {reachable_bfs}\n")


# Exercise 4: Graph DFS

def dfs(graph, start, visited=None):
    """
    Explores deep down each path recursively before backtracking.
    Returns the list of visited nodes in DFS order.
    """
    if visited is None:
        visited = []
        
    visited.append(start)
    
    for neighbor in graph.get(start, []):
        if neighbor not in visited:
            dfs(graph, neighbor, visited)
            
    return visited

dfs_order = dfs(transfers_graph, "Almaz")
print(f"DFS visit order from Almaz: {dfs_order}")
print("Comparison:")
print(" - BFS explores neighbors level-by-level (breadth-first).")
print(" - DFS explores as deep as possible along each path before backtracking (depth-first).\n")


# Exercise 5: Priority Queue with heapq


pq = []

# Push 5 (priority, task) tuples in mixed order
heapq.heappush(pq, (3, "Process monthly interest"))
heapq.heappush(pq, (1, "Flag suspicious transfer"))  # Urgent
heapq.heappush(pq, (5, "Archive closed accounts"))   # Low priority
heapq.heappush(pq, (2, "Send fraud alert notification"))
heapq.heappush(pq, (4, "Generate branch summary report"))

print("Popping tasks in priority order:")
while pq:
    priority, task = heapq.heappop(pq)
    print(f"  [Priority {priority}] {task}")