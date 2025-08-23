#ASSIGNMENT 3
#PART 1
#Q8:Write a function to compute the area and circumference of the circle and return the computed results.
r=int(input("Enter the radius:"))
def funckky(r):
    area=3.14*r**2
    circum=3.14*r*2
    return area,circum
area,circum=funckky(r)
print(F"The area is {area:.4f}\nThe circumference is {circum:.4f}")
