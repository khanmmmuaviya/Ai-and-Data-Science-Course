#ASSIGNMENT 3
#PART 1
#Q9:Write a function to take user’s score as argument and determine if they pass or fail.
score=int(input("Enter your score:"))
def jusk_tidding(score):
    if score>=60 :
        res="PASSED"
    else:
        res="FAILED"
    return res
just_kidding=jusk_tidding(score)
print(f"You are {just_kidding}...") 
