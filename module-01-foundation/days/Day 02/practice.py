temperature = float(input("Enter temperature in °C: "))

if temperature < 15:
    print("cold")
elif temperature <= 28:
    print("warm")
else:
    print("hot")



for number in range(1, 11):
    print(f"Receipt #{number}")


for number in range(1, 21):
    if number % 2 == 0:
        print(number)


def apply_discount(price, percent=10):
    discount_amount = price * percent / 100
    final_price = price - discount_amount
    return final_price

print(apply_discount(100))
print(apply_discount(100, 20))


count = 5

while count >= 1:
    print(count)
    count = count - 1

print("Liftoff!")