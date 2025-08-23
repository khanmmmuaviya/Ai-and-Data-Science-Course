#ASSIGNMENT 3
#PART 2
"""
Q6:From the given list:
Gadgets = [“Mobile”,“Laptop”,10.0,“Marker”,3,10,“Speakers”,“Camera”,310.25]
a.Create separate list of string and numbers,
b.Sort the string list in ascending and descending order
c.Sort the string list by length of elements in the list
d.Sort the numbers list in ascending and descending order
"""
Gadgets=["Mobile","Laptop",10.0,"Marker",3,10,"Speakers","Camera",310.25]
num=[]
st=[]
for items in Gadgets:
    if type(items)==str:
        st.append(items)
    elif type(items)==int or type(items)==float:
        num.append(items)
print("-Gadgets List:\n",Gadgets)
print("\n#Creating separate lists of strings and numbers")
print("\n-Numbers list(from Gadgets list):\n",num)
print("\n-Strings list(from Gadgets list):\n",st)
print("\n#Sorting the strings list in ascending and descending order")
st.sort()
print("\n-Strings list(sorted in ascending order):\n",st)
st.sort(reverse=True)
print("\n-Strings list(sorted in descending order):\n",st)
print("\n#Sort the string list by length of elements in the list")
st.sort(key=len)
print("\n-Strings list(sorted by length):\n",st)
print("\n#Sorting the numbers list in ascending and descending order")
num.sort()
print("\n-Numbers list(sorted in ascending order):\n",num)
num.sort(reverse=True)
print("\n-Numbers list(sorted in descending order):\n",num)
