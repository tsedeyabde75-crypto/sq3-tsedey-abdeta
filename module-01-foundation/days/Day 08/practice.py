import random


def total(nums):
    if not nums:
        return 0
    return nums[0] + total(nums[1:])


def count_down(n):
    if n <= 0:
        return
    print(n)
    count_down(n - 1)


print(f"Total of [10, 20, 30]: {total([10, 20, 30])}")
print("Countdown from 5:")
count_down(5)
print()


def binary_search(items, target):
    lo, hi = 0, len(items) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if items[mid] == target:
            return mid
        elif items[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1


balances = [100.50, 250.00, 500.75, 1200.00, 3500.00, 10000.00]
target_balance = 1200.00
idx = binary_search(balances, target_balance)
print(f"Balances: {balances}")
print(f"Index of {target_balance}: {idx}")
print(f"Index of 999.99 (not found): {binary_search(balances, 999.99)}")
print()


def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result


def merge_sort(items):
    if len(items) <= 1:
        return items
    mid = len(items) // 2
    left = merge_sort(items[:mid])
    right = merge_sort(items[mid:])
    return merge(left, right)


random_list = [random.randint(1, 100) for _ in range(10)]
sorted_by_merge = merge_sort(random_list)
sorted_by_builtin = sorted(random_list)

print(f"Original list: {random_list}")
print(f"Merge sort result: {sorted_by_merge}")
print(f"Matches Python's sorted(): {sorted_by_merge == sorted_by_builtin}")
print()


accounts = [
    ("Almaz", 2500.50),
    ("Dawit", 10000.00),
    ("Tigist", 450.75),
    ("Samuel", 7800.25),
]

sorted_accounts = sorted(accounts, key=lambda acc: acc[1], reverse=True)
print("Accounts sorted by balance descending:")
for name, balance in sorted_accounts:
    print(f"  {name}: ${balance:.2f}")
print()


def has_pair(nums, target):
    lo, hi = 0, len(nums) - 1
    while lo < hi:
        s = nums[lo] + nums[hi]
        if s == target:
            return True
        elif s < target:
            lo += 1
        else:
            hi -= 1
    return False


sorted_numbers = [10, 25, 40, 55, 70, 90, 110]
target_sum1 = 95
target_sum2 = 100

print(f"Sorted numbers: {sorted_numbers}")
print(f"Has pair summing to {target_sum1}? {has_pair(sorted_numbers, target_sum1)}")
print(f"Has pair summing to {target_sum2}? {has_pair(sorted_numbers, target_sum2)}")