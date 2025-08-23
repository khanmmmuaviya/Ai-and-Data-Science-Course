#ASSIGNMENT
#PART 1
#Q5:Write a function to take user’s age as argument and return the message from the function whether he is minor, adult or senior citizen.
age=int(input("Enter Your Age:"))
def age_check(age):
    if age<18:
        res="a minor citizen"
    elif  age>=18 and age<60:
        res="an adult citizen"
    else:
        res="a senior citizen"
    return res
result=(age_check(age))
print(f"The user is {result}")
        
    
        
