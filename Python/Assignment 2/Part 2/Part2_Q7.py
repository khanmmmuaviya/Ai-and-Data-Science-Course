#PART 2
#Q7:Write a program to compute the factorial of a number using while loop.
num=int(input("Enter an integer:"))
factorial=1
i=1
if num<0 :
    print("\nFactorial is unavailable for negative numbers...")
elif num==0 :
    print("\nFactorial of 0 is 1...")
else :
    while i<=num :
        factorial*=i
        i+=1
        print(f"\nThe factorial of {num} is {factorial}...")
