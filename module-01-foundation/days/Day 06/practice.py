import math


class ReportBuilder:
    def build(self, data):
        return f"Report: {data}"


class ReportSaver:
    def save(self, report, filename):
        with open(filename, "w") as f:
            f.write(report)


class ReportEmailer:
    def send(self, report, recipient):
        print(f"Sending report to {recipient}: {report}")


class Shape:
    def area(self):
        pass


class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height


class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return math.pi * self.radius ** 2


def print_area(shape: Shape):
    print(f"Area: {shape.area()}")


class AppSettings:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.currency = "ETB"
        return cls._instance


class Square(Shape):
    def __init__(self, side):
        self.side = side

    def area(self):
        return self.side ** 2


class Triangle(Shape):
    def __init__(self, base, height):
        self.base = base
        self.height = height

    def area(self):
        return 0.5 * self.base * self.height


class ShapeFactory:
    @staticmethod
    def create(kind, *args):
        if kind == "circle":
            return Circle(*args)
        elif kind == "square":
            return Square(*args)
        elif kind == "triangle":
            return Triangle(*args)
        else:
            raise ValueError(f"Unknown shape type: {kind}")


class NewsAgency:
    def __init__(self):
        self._subscribers = []

    def subscribe(self, subscriber):
        self._subscribers.append(subscriber)

    def notify(self, news):
        for subscriber in self._subscribers:
            subscriber.update(news)


class EmailSubscriber:
    def update(self, news):
        print(f"[Email Notification] {news}")


class SMSSubscriber:
    def update(self, news):
        print(f"[SMS Notification] {news}")


if __name__ == "__main__":
    builder = ReportBuilder()
    report = builder.build("Sales Data")
    emailer = ReportEmailer()
    emailer.send(report, "user@example.com")

    rect = Rectangle(5, 10)
    print_area(rect)

    s1 = AppSettings()
    s2 = AppSettings()
    print(f"Currency: {s1.currency}")
    print(f"Same instance: {s1 is s2}")

    shape = ShapeFactory.create("circle", 7)
    print(f"Factory Shape Area: {shape.area():.2f}")

    agency = NewsAgency()
    agency.subscribe(EmailSubscriber())
    agency.subscribe(SMSSubscriber())
    agency.notify("Breaking News: Python is awesome!")