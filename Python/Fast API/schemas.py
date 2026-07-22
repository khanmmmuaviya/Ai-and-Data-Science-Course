from pydantic import BaseModel, EmailStr, Field

class StudentBase(BaseModel):
    name: str
    email: EmailStr
    age: int = Field(..., gt=0) # Ensures age is positive
    course: str

class StudentCreate(StudentBase):
    pass

class StudentResponse(StudentBase):
    id: int

    class Config:
        from_attributes = True