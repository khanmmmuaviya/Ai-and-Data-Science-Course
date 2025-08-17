#PART 1
#Q2:Write a program to find larger of the two numbers.
num1=float(input("Enter your first number:"))
num2=float(input("\nEnter your second number:"))
if num1>num2 :
    print(f"\nThe {num1} is larger than {num2}.")
elif num1<num2 :
    print(f"\nThe {num2} is larger than {num1}.")
else :
    print("\nBoth numbers are equal.")
