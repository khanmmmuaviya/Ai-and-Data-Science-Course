#PART 1
#Q11:Write a program that evaluates if an input number is prime.
num=int(input("Enter a number:"))
check=True
if num>1:
    for i in range(2,num):
        if num%i==0:
            print(f"{num} is not a prime...")
            check=False
            break
if check:
    print(f"{num} is a prime number...")
