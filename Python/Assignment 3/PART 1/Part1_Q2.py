#ASSIGNMENT 3
#PART 1
#Q2:Write a function that takes a number as argument and check if a given number is positive, negative or zero.
num=int(input("Enter a number:"))
def mera_fun (num):
    if num>0:
        print(f"{num} is a positive number")
    elif num<0:
        print(f"{num} is a negative number")
    else:
        print(f"{num} is zero")
mera_fun(num)
