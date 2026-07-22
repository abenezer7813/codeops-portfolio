#vehicle hierarchy
from abc import abstractmethod


class Vehicle:
    def __init__(self,make,model):
       self.make=make
       self.model=model

    def describe(self):
       return f"{self.make} {self.model}"
    @abstractmethod
    def wheels():
        pass
class Car(Vehicle):
     pass
     def wheels(self):
         return 4;
class Truck(Vehicle):
    def __init__(self, make, model,capacity):
       super().__init__(make, model)
       self.capacity=capacity
    def describe(self):
       return f"{self.make} {self.model} capacity {self.capacity}"
    def wheels(self):
         return 10
#a list of instances of car and truck
Vehicles=[
    Car("Toyota", "Yaris"),
    Truck("Isuzu", "NPR", 5000),
    Car("Suzuki", "Swift"),
    Truck("Hino", "300", 2500),
]
#describing vehicles 
for vehicle in Vehicles:
    print(vehicle.describe())