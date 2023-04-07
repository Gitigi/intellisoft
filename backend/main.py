from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

import models
import schemas
from db import get_db


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/patients", response_model=list[schemas.Patient])
def patients(db: Session = Depends(get_db)):
    return db.query(models.Patient).all()

@app.get("/patients/{id}", response_model=schemas.Patient)
def patients(id:int, db: Session = Depends(get_db)):
    return db.query(models.Patient).where(models.Patient.id == id).first()

@app.get("/patients/{id}/visits", response_model=list[schemas.Visit])
def patients(id: int, db: Session = Depends(get_db)):
    return db.query(models.Visit).where(models.Visit.patient_id == id).all()

@app.post("/patients", response_model=schemas.Patient)
def patients(patient: schemas.PatientCreate, db: Session = Depends(get_db)):
    db_patient = models.Patient(
        firstname=patient.firstname,
        lastname=patient.lastname,
        dob=patient.dob,
        gender=patient.gender
    )
    db.add(db_patient)
    db.commit()
    db.refresh(db_patient)
    return db_patient

@app.put("/patients/{id}", response_model=schemas.Patient)
def patients(id:int, patient: schemas.PatientUpdate, db: Session = Depends(get_db)):
    update_data = patient.dict(exclude_unset=True)
    r = db.query(models.Patient).where(models.Patient.id == id).update(update_data)
    return db.query(models.Patient).where(models.Patient.id == id).first()

@app.delete("/patients/{id}")
def patient(id: int, db: Session = Depends(get_db)):
    db.query(models.Patient).where(models.Patient.id == id).delete()
    db.commit()
    return {"success": True}

@app.get("/visits", response_model=list[schemas.Visit])
def patients(db: Session = Depends(get_db)):
    return db.query(models.Visit).all()

@app.get("/visits/{id}", response_model=schemas.Visit)
def patients(id: int, db: Session = Depends(get_db)):
    return db.query(models.Visit).where(models.Visit.id == id).first()

@app.post("/visits", response_model=schemas.Visit)
def patients(visit: schemas.VisitCreate, db: Session = Depends(get_db)):
    db_visit = models.Visit(
        patient_id=visit.patient_id,
        visit_date=visit.visit_date,
        height=visit.height,
        width=visit.width,
        health=visit.health,
        diet=visit.diet,
        drugs=visit.drugs
    )
    db.add(db_visit)
    db.commit()
    db.refresh(db_visit)
    return db_visit
    
@app.put("/visits/{id}", response_model=schemas.Visit)
def visit(id:int, visit: schemas.VisitUpdate, db: Session = Depends(get_db)):
    update_data = visit.dict(exclude_unset=True)
    r = db.query(models.Visit).where(models.Visit.id == id).update(update_data)
    return db.query(models.Visit).where(models.Visit.id == id).first()

@app.delete("/visits/{id}")
def visit(id: int, db: Session = Depends(get_db)):
    db.query(models.Visit).where(models.Visit.id == id).delete()
    db.commit()
    return {"success": True}