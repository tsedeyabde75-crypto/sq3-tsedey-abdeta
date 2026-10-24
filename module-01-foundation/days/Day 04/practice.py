class Book:
    def __init__(self, title, author, pages):
        self.title = title
        self.author = author
        self.pages = pages

    def describe(self):
        print(f"'{self.title}' by {self.author}, {self.pages} pages.")


book1 = Book("The Hobbit", "J.R.R. Tolkien", 310)
book2 = Book("1984", "George Orwell", 328)

book1.describe()
book2.describe()


class Product:
    def __init__(self, name, price, quantity):
        self.name = name
        self.price = price
        self.quantity = quantity

    @property
    def quantity(self):
        return self.__quantity

    @quantity.setter
    def quantity(self, value):
        if value < 0:
            raise ValueError("Quantity cannot be negative.")
        self.__quantity = value

    def restock(self, n):
        if n <= 0:
            raise ValueError("Restock amount must be positive.")
        self.quantity += n

    def sell(self, n):
        if n <= 0:
            raise ValueError("Sell amount must be positive.")
        if n > self.quantity:
            raise ValueError("Insufficient quantity to sell.")
        self.quantity -= n


p1 = Product("Laptop", 45000, 10)
p2 = Product("Phone", 15000, 5)
p3 = Product("Tablet", 20000, 8)

p1.sell(2)

print(f"{p1.name} quantity: {p1.quantity}")
print(f"{p2.name} quantity: {p2.quantity}")
print(f"{p3.name} quantity: {p3.quantity}")