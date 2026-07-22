#ASSIGNMENT 3
#PART 1
#Q3:Write a function to take two numbers as arguments and return the larger number.
num_1=int(input("Enter first number:"))
num_2=int(input("Enter second number:"))
def mera_fun (num_1,num_2):
    if num_1>num_2:
        print(f"{num_1} is greater than {num_2}")
    elif num_1<num_2:
        print(f"{num_2} is greater than {num_1}")
    else:
        print(f"{num_1} and {num_2} are equal")
mera_fun (num_1,num_2)
        
