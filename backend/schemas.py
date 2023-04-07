from pydantic import BaseModel
import datetime
from models import Gender, HealthStatus

class PatientBase(BaseModel):
    firstname: str
    lastname: str
    dob: datetime.date
    gender: Gender

class Patient(PatientBase):
    id: str
    age: int

    class Config:
        orm_mode = True

class PatientCreate(PatientBase):
    pass

class PatientUpdate(BaseModel):
    id: int | None
    firstname: str | None
    lastname: str | None
    dob: datetime.date | None
    gender: Gender | None

class VisitBase(BaseModel):
    patient_id: int
    height: float
    width: float
    health: HealthStatus
    diet: bool | None
    drugs: bool | None
    visit_date: datetime.date
    comments: str | None

class Visit(VisitBase):
    id: str
    mbi: float
    mbi_status: str
    patient: Patient

    class Config:
        orm_mode = True

class VisitCreate(VisitBase):
    pass

class VisitUpdate(BaseModel):
    id: int | None
    patient_id: int | None
    height: float | None
    width: float | None
    health: HealthStatus | None
    diet: bool | None
    drugs: bool | None
    visit_date: datetime.date | None
    comments: str | None
