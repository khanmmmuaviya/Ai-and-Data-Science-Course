#PART 2
#Q3:Write a program to print multiplication table of a given number.
num=float(input("Enter the table number:"))
for i in range(1,11):
    print(f"{num} x {i} =",num*i)
