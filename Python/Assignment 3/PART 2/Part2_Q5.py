#ASSIGNMENT 3
#PART 2
"""
Q5:Create a list [32,54,66,11,77,10,90]
a.Remove items from the list with values less than 20.
b.Sort the list in ascending and descending order.
c.Now, compute the average value of the list items.
"""
list=[32,54,66,11,77,10,90]
print("-Original List:\n",list)
print("\n#Removing items from the list with values less than 20")
[item for item in list if item>=20]
print("\n-List(without values under 20):\n",list)
print("\n#Sorting the list in ascending and descending order")
list.sort()
print("\n-List(sorted in ascending order):\n",list)
list.sort(reverse=True)
print("\n-List(sorted in descending order):\n",list)
print("\n#Computing the average value of the list items")
avg=sum(list)/len(list)
print(f"\n-The average value of the list items is {avg}...")
