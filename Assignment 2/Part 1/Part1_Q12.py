#PART 1
#Q12:Write a program that takes a temperature in Celsius and checks if it is freezing, moderate or hot.
temp=float(input("Enter temperature in celsius:"))
if temp<0 :
    print(f"\n{temp}° is freezing temperature...")
elif temp>=0 and temp<26 :
    print(f"\n{temp}° is moderate temperature...")
else :
    print(f"{temp}° is hot temperature")
