#STUDENT RECORD MANAGEMENT SYSTEM

records=[]
#1
def add_student():
    print("-------------------------------")
    name=input("Enter name:")
    roll_no=input("Enter roll no:")
    course=input("Enter course:")
    marks=int(input("Enter marks:"))
    records.append([name, roll_no, course, marks])
    print("Record Added Successfully...")
#2
def display_student():
    if records:
        for rec in records:
            print("\tRecord Found...")
            print("-------------------------------")
            print(f"Name:{rec[0]}")
            print(f"Roll no:{rec[1]}")
            print(f"Course:{rec[2]}")
            print(f"Marks:{rec[3]}")
        print("Record Displayed Successfully...")
    else:
        print("No Record Available!!!\nEnter Record First...")

#3
def search_student():
    if records:
        roll_no=input("Enter Roll No To Search Student:")
        for ind, student in enumerate(records):
            if roll_no==student[1]:
                return student, ind
        return None, None
    else:
        print("No Record Available!!!\nEnter Record First...")
        return None, None

#4
def update_student():
    student_rec, ind=search_student()
    if student_rec is not None:
        print("-------------------------------")
        print("\tStudent Found...")
        print(f"Name:{student_rec[0]}")
        print(f"Roll no:{student_rec[1]}")
        print(f"Course:{student_rec[2]}")
        print(f"Marks:{student_rec[3]}")
        new_marks=int(input("Enter marks to update:"))
        records[ind][3]=new_marks
        print("Record Updated Successsfully...")
    else:
        print("No Record Available!!!\nEnter Record First...")
        
            
#5
def delete_student():
    student_rec, ind=search_student()
    if student_rec is not None:
        records.remove(student_rec)
        print("-------------------------------")
        print("Record  Deleted Successfully...")
    else:
        print("No Record Available!!!\nEnter Record First...")
    
#6
def sort_student():
    if records:
        records.sort(key=lambda x:x[3], reverse=True)
        print("Records Sorted Successfully...")
    else:
        print("No Record Available!!!\nEnter Record First...")



while True:
    print("-------------------------------")
    print("1.Add Student")
    print("2.Display Student")
    print("3.Search Student")
    print("4.Update Student")
    print("5.Delete Student")
    print("6.Sort Student")
    print("7.Exit")
    print("-------------------------------")

    opt=int(input("Enter your option:"))
    if opt==1:
        add_student()
    elif opt==2:
        print("-------------------------------")
        display_student()
    elif opt==3:
        student_rec, _=search_student()
        if student_rec is not None:
            print("-------------------------------")
            print("\tStudent Found...")
            print(f"Name:{student_rec[0]}")
            print(f"Roll no:{student_rec[1]}")
            print(f"Course:{student_rec[2]}")
            print(f"Marks:{student_rec[3]}")
        else:
            print("Invalid Roll no!!!")
            
    elif opt==4:
        update_student()
    elif opt==5:
        delete_student()
    elif opt==6:
        sort_student()
    elif opt==7:
        break
    else:
        print("Invalid Option!!!\nPlease choose between 1-7")
