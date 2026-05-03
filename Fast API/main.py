from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
import models, schemas, crud
from database import SessionLocal, engine

# Create the database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Student Management System")

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/create-student/", response_model=schemas.StudentResponse)
def create_student(student: schemas.StudentCreate, db: Session = Depends(get_db)):
    return crud.create_student(db=db, student=student)

@app.get("/students-all/", response_model=list[schemas.StudentResponse])
def read_students(db: Session = Depends(get_db)):
    return crud.get_students(db)

@app.get("/student/{id}", response_model=schemas.StudentResponse)
def read_student(id: int, db: Session = Depends(get_db)):
    db_student = crud.get_student(db, id)
    if db_student is None:
        raise HTTPException(status_code=404, detail="Student not found")
    return db_student

@app.put("/update-students/{id}", response_model=schemas.StudentResponse)
def update_student(id: int, student: schemas.StudentCreate, db: Session = Depends(get_db)):
    updated = crud.update_student(db, id, student)
    if not updated:
        raise HTTPException(status_code=404, detail="Student not found")
    return updated

@app.delete("/delete-students/{id}")
def delete_student(id: int, db: Session = Depends(get_db)):
    success = crud.delete_student(db, id)
    if not success:
        raise HTTPException(status_code=404, detail="Student not found")
    return {"message": "Student deleted successfully"}