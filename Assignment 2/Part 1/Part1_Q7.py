#PART 1
#Q7:Write a program to take two numbers and an operator (/,x,+,-) as input and perform the corresponding operation.
num_1=float(input("Enter your first number:"))
num_2=float(input("\nEnter your second number:"))
operator=input("\nEnter an arithmetic operators of your choice:")
if operator=="/" :
    ans=num_1/num_2
    print(f"\nThe answer of {num_1}{operator}{num_2}=",ans)
elif operator=="*" :
    ans=num_1*num_2
    print(f"\nThe answer of {num_1} {operator} {num_2} =",ans)
elif operator=="+" :
    ans=num_1+num_2
    print(f"\nThe answer of {num_1}{operator}{num_2}=",ans)
elif operator=="-" :
    ans=num_1-num_2
    print(f"\nThe answer of {num_1}{operator}{num_2}=",ans)
else :
    print("\nInvalid operator!!!")
