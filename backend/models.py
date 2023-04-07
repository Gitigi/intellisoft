from typing import List
from sqlalchemy import CheckConstraint
from sqlalchemy import ForeignKey
from sqlalchemy import String, Text
from sqlalchemy import DateTime
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship
from sqlalchemy.ext.hybrid import hybrid_property
from datetime import datetime
import math

import enum
from sqlalchemy import Enum

class Gender(enum.Enum):
    M = "M"
    F = "F"

class HealthStatus(enum.Enum):
    good = "good"
    poor = "poor"

from db import Base

class Patient(Base):
    __tablename__ = "patient"
    id: Mapped[int] = mapped_column(primary_key=True)
    firstname: Mapped[str] = mapped_column(String(40))
    lastname: Mapped[str] = mapped_column(String(40))
    dob:Mapped[datetime] = mapped_column(DateTime)
    gender: Mapped[Gender] = mapped_column(Enum(Gender), default="M")
    visits: Mapped[List["Visit"]] = relationship(
        back_populates="patient", cascade="all, delete-orphan"
    )

    @hybrid_property
    def age(self):
        age = datetime.now() - self.dob
        return math.ceil(age.days / 365)
    
    def __repr__(self) -> str:
        return f"User(id={self.id!r}, name={self.firstname!r}, fullname={self.lastname!r})"

class Visit(Base):
    __tablename__ = "visit"
    __table_args__ = (
        CheckConstraint('height > 0'),
        CheckConstraint('width > 0'),
    )

    id: Mapped[int] = mapped_column(primary_key=True)
    height: Mapped[float]
    width: Mapped[float]
    visit_date: Mapped[datetime] = mapped_column(DateTime)
    health: Mapped[HealthStatus] = mapped_column(Enum(HealthStatus))
    diet: Mapped[bool] = mapped_column(default=False)
    drugs: Mapped[bool] = mapped_column(default=False)
    comments: Mapped[str] = mapped_column(Text, default='', nullable=True)
    patient_id: Mapped[int] = mapped_column(ForeignKey("patient.id"))
    patient: Mapped["Patient"] = relationship(back_populates="visits")

    @hybrid_property
    def mbi(self):
        return self.width/ ((self.height / 100) ** 2)
    
    @mbi.expression
    def mbi(cls):
        return cls.width / ((cls.height / 100) * (cls.height / 100))
    
    @hybrid_property
    def mbi_status(self):
        if self.mbi < 18.5:
            return 'Underweight'
        elif self.mbi < 25:
            return 'Normal'
        else:
            return 'Overweight'

    def __repr__(self) -> str:
        return f"Address(id={self.id!r}, email_address={self.visit_date!r}, patient_id={self.patient_id!r})"
