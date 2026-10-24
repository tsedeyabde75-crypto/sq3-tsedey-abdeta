cities = ["Addis Ababa", "Adama", "Hawassa", "Addis Ababa", "Bahir Dar", "Adama"]
unique_cities = set(cities)
print(unique_cities)
print(len(unique_cities))

groceries = {
    "Bread": 50,
    "Milk": 80,
    "Eggs": 120,
    "Apples": 150,
    "Coffee": 300
}
for item, price in groceries.items():
    print(f"{item}: {price} ETB")

prices = [100, 250, 400, 80]
prices_with_tax = [p * 1.15 for p in prices]
print(prices_with_tax)

cheap_prices = [p for p in prices if p < 200]
print(cheap_prices)

with open("names.txt", "w") as f:
    f.write("Almaz\nDawit\nSamuel\n")

with open("names.txt", "r") as f:
    for line in f:
        print(line.strip())

try:
    number = int(input("Enter a number: "))
    result = 1000 / number
    print(f"Result: {result}")
except ValueError:
    print("Please enter a valid number.")
except ZeroDivisionError:
    print("Cannot divide by zero.")