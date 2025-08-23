#ASSIGNMENT 3
#PART 1
#Q11:Write a function to compute factorial of a given number using recursion technique.
num=int(input("Enter a number:"))
def factorial(num):
    if num<0:
        res="not defined"
    elif num==0:
        res=1
    else:
        res=num*factorial(num-1)
    return res
result=factorial(num)
print(f"The factorial of {num} is {result}...")

