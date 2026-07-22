#PART 2
#Q11:Write a program to calculate the sum of even and odd numbers and print them. (numbers from 1 to 50)
#for even numbers
even_sum=0
odd_sum=0
for num in range(1,51) :
    if num%2==0 :
        even_sum+=num
    else :
        odd_sum+=num
print("The sum of even numbers from 1 to 50 is ",even_sum)
print("The sum of odd numbersfrom 1 to 50 is ",odd_sum)
