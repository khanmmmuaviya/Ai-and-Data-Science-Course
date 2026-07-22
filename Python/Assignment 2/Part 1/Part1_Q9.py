#PART 1
#Q9:Write a program that ask for an integer number and checks if it is divisible by 2, 3, or both.
num=int(input("Enter an integer:"))
if num%2==0 and num%3==0 :
    print(f"\n{num} is divisible by 2 and 3 both...")
elif num%2==0 and num%3!=0 :
    print(f"\n{num} is only divisible by 2...")
elif num%2!=0 and num%3==0 :
    print(f"\n{num} is only divisible by 3...")
else :
    print(f"\n{num} is neither divisible by 2 nor 3...")
