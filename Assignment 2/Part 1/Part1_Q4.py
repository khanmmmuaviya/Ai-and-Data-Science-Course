#PART 1
#Q4:Write a program to check if the given string “Mass” is present in the string “Saylani Mass IT”. If the string is present then display the message “string found”.
institute_name="Saylani Mass IT"
word=input("Enter string to be found:")
if f"{word}" in institute_name :
    print("\nString found")
else :
    print("\nString not found")
