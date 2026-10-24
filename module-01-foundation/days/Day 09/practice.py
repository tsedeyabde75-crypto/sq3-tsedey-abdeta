import heapq
from collections import deque


class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


def insert(root, value):
    if root is None:
        return TreeNode(value)
    if value < root.value:
        root.left = insert(root.left, value)
    else:
        root.right = insert(root.right, value)
    return root


def in_order(node):
    if node is None:
        return []
    return in_order(node.left) + [node.value] + in_order(node.right)


def height(node):
    if node is None:
        return 0
    return 1 + max(height(node.left), height(node.right))


root = None
balances = [250.50, 100.00, 500.75, 50.25, 150.00, 300.00]
for b in balances:
    root = insert(root, b)

print(f"In-order traversal (sorted): {in_order(root)}")
print(f"Tree height/depth: {height(root)}")
print()


def bfs(graph, start):
    seen = {start}
    queue = deque([start])
    visited_order = []
    while queue:
        node = queue.popleft()
        visited_order.append(node)
        for neighbor in graph.get(node, []):
            if neighbor not in seen:
                seen.add(neighbor)
                queue.append(neighbor)
    return visited_order, seen


def dfs(graph, start, seen=None, visited_order=None):
    if seen is None:
        seen = set()
    if visited_order is None:
        visited_order = []

    seen.add(start)
    visited_order.append(start)
    for neighbor in graph.get(start, []):
        if neighbor not in seen:
            dfs(graph, neighbor, seen, visited_order)
    return visited_order, seen


graph = {
    "Almaz": ["Dawit", "Tigist"],
    "Dawit": ["Samuel"],
    "Tigist": ["Samuel", "Hanna"],
    "Samuel": ["Hanna"],
    "Hanna": [],
}

bfs_order, reachable_bfs = bfs(graph, "Almaz")
dfs_order, reachable_dfs = dfs(graph, "Almaz")

print(f"Graph BFS visit order from Almaz: {bfs_order}")
print(f"Graph DFS visit order from Almaz: {dfs_order}")
print(f"Reachable set: {reachable_bfs}")
print()


tasks = [
    (3, "Audit Accounts"),
    (1, "Server Downtime Alert"),
    (5, "Order Supplies"),
    (2, "Process Withdrawal"),
    (4, "Generate Report"),
]

pq = []
for task in tasks:
    heapq.heappush(pq, task)

print("Popping tasks from Priority Queue:")
while pq:
    priority, task_name = heapq.heappop(pq)
    print(f"  Priority {priority}: {task_name}")