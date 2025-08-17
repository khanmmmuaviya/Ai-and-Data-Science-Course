#PART 1
#Q5:Write a program to take user’s age as input and display whether he is minor, adult or senior citizen.
user_age=int(input("Enter your age:"))
if user_age<18 :
    print(f"\nThe user is a minor and his age is {user_age}.")
elif user_age>=18 and user_age<60 :
    print(f"\nThe user is an adult and his age is {user_age}.")
else :
    print(f"\nThe user is a senior citizen and his age is {user_age}.")
