#ASSIGNMENT 3
#PART 2
#Q3:	Create a list [“apple”, “raspberry”, “pineapple”, “cherry”]. 
#a.	 How can you check if apple is present in the list and get the index of the element (if present)
#b.	Now replace the raspberry and pineapple with orange.
#c.	Insert “apricot” at index 2.
Fruits=["apple", "raspberry", "pineapple", "cherry"]
print('\nList:\n',Fruits)
print("\n##\nChecking whether 'apple' is present in list and getting its index number(if present).\n##")
if "apple" in Fruits:
    index=Fruits.index("apple")
    print(f"\nThe apple is present at index {index}...")
else:
    print("The apple is not found in list...")
print('\nList:\n',Fruits)
print("\n##\nNow replacing raspberry and pineapple with orange.\n##")
Fruits[1:3]=["orange"]
print('\nList:\n',Fruits)
print("\n##\nNow inserting apricot at index 2\n##")
Fruits.insert(2,"apricot")
print('\nList:\n',Fruits)
