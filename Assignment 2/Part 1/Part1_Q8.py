#PART 1
#Q8:Write a program to take number as input and check if it lies in the range i.e. 20(inclusive) – 40 (exclusive).
num=float(input("Enter a number:"))
if num>=20 and num<40 :
    print(f"{num} lies in the range...")
else :
    print(f"{num} does not lie in the range...")
