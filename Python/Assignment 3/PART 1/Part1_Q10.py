#ASSIGNMENT 3
#PART 1
#Q10:Write a function that evaluates if an input number is prime.
num=int(input("Enter a number:"))
def funccc(num):
    check=True
    if num>1:
        for i in range(2,num):
            if num%i==0:
                res=f"{num} not is not a prime number..."
                check=False
                break
    if check:
        res=f"{num} is a prime number..."
    return res
result=funccc(num)
print(result)
