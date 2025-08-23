#ASSIGNMENT 3
#PART 2
#Q1:Create a list to store student data i.e. name, age, course and is_attending. Display each element of list using for loop.
name=input("Enter your name:")
age=int(input("Enter your age:"))
course=input("Enter your course name:")
attending=bool(input("Are you attending:"))
List=[name,age,course,attending]
print("LIST:")
for i in List:
    print(i)
