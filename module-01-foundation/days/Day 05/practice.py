from abc import ABC, abstractmethod


class Vehicle(ABC):
    def __init__(self, make, model):
        self.make = make
        self.model = model

    def describe(self):
        print(f"Vehicle: {self.make} {self.model}")

    @abstractmethod
    def wheels(self):
        pass


class Car(Vehicle):
    def describe(self):
        print(f"Car: {self.make} {self.model}")

    def wheels(self):
        return 4


class Truck(Vehicle):
    def __init__(self, make, model, capacity):
        super().__init__(make, model)
        self.capacity = capacity

    def describe(self):
        print(f"Truck: {self.make} {self.model} with capacity of {self.capacity} tons")

    def wheels(self):
        return 6


vehicles = [
    Car("Toyota", "Corolla"),
    Truck("Volvo", "FH16", 25),
    Car("Tesla", "Model 3")
]

for vehicle in vehicles:
    vehicle.describe()
    print(f"Wheels: {vehicle.wheels()}")