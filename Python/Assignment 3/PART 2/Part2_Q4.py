#ASSIGNMENT 3
#PART 2
#Q4:Write a code to get first and second best scores from the list:
scores_list = [40, 89, 90, 89, 23, 90, 50]
print("List(with duplicates):\n",scores_list)
scores=[]
for i in scores_list:
    if i not in scores:
        scores.append(i)
print("\nList(without duplicates):\n",scores)
scores.sort()
print("\nList(sorted in ascending order):\n",scores)
print(f"\nThe highest score is {scores[-1]}")
print(f"\nThe second highest score is {scores[-2]}")
