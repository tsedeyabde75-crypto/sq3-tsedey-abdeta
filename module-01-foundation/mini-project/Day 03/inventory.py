stock = {}

try:
    with open("stock.txt", "r") as f:
        for line in f:
            if line.strip():
                item, qty = line.strip().split(",")
                stock[item] = int(qty)
except FileNotFoundError:
    print("No stock file yet - starting empty")


def adjust(item, amount):
    stock[item] = stock.get(item, 0) + amount


adjust("Paracetamol", 20)
adjust("Amoxicillin", 5)
adjust("Ibuprofen", 8)
adjust("Amoxicillin", 2)

low = [item for item, qty in stock.items() if qty < 10]
print("Low stock:", low)

print("\n--- Current Stock ---")
for item, qty in stock.items():
    print(f"{item}: {qty}")

with open("stock.txt", "w") as f:
    for item, qty in stock.items():
        f.write(f"{item},{qty}\n")