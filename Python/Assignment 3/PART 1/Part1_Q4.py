#ASSIGNMENT 3
#PART 1
#Q4:Write a function to take three numbers as argument and return the largest number.
num1=int(input("Enter first number:"))
num2=int(input("Enter second number:"))
num3=int(input("Enter third number:"))
def funcky (num1,num3,num2):
    if num1>num2 and num1>num3:
        print(f"{num1} is the largest number")
    elif num2>num1 and num2>num3:
        print(f"{num2} is the largest number")
    elif num3>num1 and num3>num2:
        print(f"{num3} is the largest number")
    else:
        print("All numbers are equal...")
funcky (num1,num2,num3)
