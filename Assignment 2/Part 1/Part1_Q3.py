#PART 1
#Q3:Write a program to find the largest of three numbers.
num1=float(input("Enter your first number:"))
num2=float(input("\nEnter your second number:"))
num3=float(input("\nEnter your third number:"))
if num1>=num2 and num1>=num3 :
    print(f"\nThe largest number is {num1}")
elif num2>=num1 and num2>=num3 :
    print(f"\nThe largest number is {num2}")
else :
    print(f"The largest number is {num3}")
