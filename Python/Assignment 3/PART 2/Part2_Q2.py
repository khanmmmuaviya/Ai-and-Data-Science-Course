#ASSIGNMENT 3
#PART 2
#Q2:Write a code to separate strings, numbers and Boolean data from the above list into separate lists.
name=input("Enter your name:")
age=int(input("\nEnter your age:"))
course=input("\nEnter your course name:")
attending=bool(input("\nAre you attending:"))
List=[name,age,course,attending]
print("\nList=",List)
print("\nLIST:")
for i in List:
    print(i)
inte=[]
bol=[]
st=[]
for items in List:
    if type(items)==str:
        st.append(items)
    elif type(items)==bool:
        bol.append(items)
    elif type(items)==int:
        inte.append(items)
print("\nStrings in List:",st,"\nBooleans in List:",bol,"\nIntegers in List:",inte)
