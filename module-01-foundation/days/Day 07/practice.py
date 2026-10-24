import time
from collections import deque

# 1. List Indexing: O(1) - Constant Time
# Explanation: Accessing an element by its index in an array/list is instantaneous.
# Python calculates the memory address using a simple offset (base_address + index * element_size)
# and jumps directly to that memory position regardless of list length.
acc = ["ACC-001", "ACC-002", "ACC-003"][1]

# 2. Single Loop: O(n) - Linear Time
# Explanation: The execution time grows in direct, linear proportion to the number of elements (n).
# If the list size doubles, the loop runs twice as many times because it must visit every element sequentially.
for item in ["ACC-001", "ACC-002", "ACC-003"]:
    pass

# 3. Nested Loop: O(n^2) - Quadratic Time
# Explanation: For every single iteration of the outer loop, the inner loop completes a full run of n iterations.
# This creates an n * n total execution count (n^2), causing work to scale quadratically.
items = ["ACC-001", "ACC-002", "ACC-003"]
for a in items:
    for b in items:
        pass

# 4. Dictionary Lookup: O(1) average - Constant Time
# Explanation: Python dictionaries use hash tables. A hash function transforms the key directly
# into a memory address, allowing instant lookup without scanning through other key-value pairs.
acc_dict = {"ACC-001": "Almaz"}
owner = acc_dict.get("ACC-001")


# 5. Binary Search: O(log n) - Logarithmic Time
# Explanation: On every step, binary search cuts the sorted input space in half and discards the unneeded half.
# Because the problem size is halved each step, doubling the total items only adds a single extra comparison.
def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1


size = 100_000
accounts_list = [f"CBE-{i}" for i in range(size)]
accounts_dict = {f"CBE-{i}": f"Owner_{i}" for i in range(size)}
target = f"CBE-{size - 1}"

start_time = time.perf_counter()
_ = target in accounts_list
list_time = time.perf_counter() - start_time

start_time = time.perf_counter()
_ = target in accounts_dict
dict_time = time.perf_counter() - start_time

print(f"List search O(n) time: {list_time:.6f} seconds")
print(f"Dict search O(1) time: {dict_time:.6f} seconds\n")


class Stack:
    def __init__(self):
        self._items = []

    def push(self, item):
        self._items.append(item)

    def pop(self):
        if self.is_empty():
            raise IndexError("Pop from empty stack")
        return self._items.pop()

    def peek(self):
        if self.is_empty():
            return None
        return self._items[-1]

    def is_empty(self):
        return len(self._items) == 0


names = ["Almaz", "Dawit", "Tigist", "Samuel"]
stack = Stack()
for name in names:
    stack.push(name)

reversed_names = []
while not stack.is_empty():
    reversed_names.append(stack.pop())

print(f"Original: {names}")
print(f"Reversed: {reversed_names}\n")

queue = deque()
customers = ["Customer 1", "Customer 2", "Customer 3", "Customer 4", "Customer 5"]

for c in customers:
    queue.append(c)
    print(f"Enqueued: {c}")

print()
while len(queue) > 0:
    print(f"Served: {queue.popleft()}")

print()


class Node:
    def __init__(self, data):
        self.data = data
        self.next = None


class LinkedList:
    def __init__(self):
        self.head = None

    def push_front(self, data):
        new_node = Node(data)
        new_node.next = self.head
        self.head = new_node

    def print_all(self):
        current = self.head
        elements = []
        while current:
            elements.append(str(current.data))
            current = current.next
        print(" -> ".join(elements) + " -> None")


ll = LinkedList()
ll.push_front("Tigist")
ll.push_front("Dawit")
ll.push_front("Almaz")
ll.print_all()