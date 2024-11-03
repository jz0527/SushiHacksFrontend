# main.py
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session
from typing import Optional
import os

from database import SessionLocal, engine
import models
from gemini import call_gemini  # Import the function from gemini.py

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Allow CORS from all origins (adjust as needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development; specify origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic model for input data
class OutputDataRequest(BaseModel):
    name: str
    description: str
    extra: Optional[str] = None
    image: Optional[str] = None

# Dependency to get a database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"message": "Welcome to FastAPI"}

# Helper function to get output data by name
def get_output_data_by_name(name: str, db: Session) -> Optional[models.OutputData]:
    return db.query(models.OutputData).filter(models.OutputData.name == name).first()

# POST endpoint to submit or update data
@app.post("/submit_output/")
async def submit_output(data: OutputDataRequest, db: Session = Depends(get_db)):
    # Call Gemini to get model response based on form data
    gemini_response = call_gemini(data.name, data.description, data.extra or "No Additional Information to Provide")

    if not gemini_response:
        raise HTTPException(status_code=500, detail="Failed to get response from Gemini.")

    # Check if a record with the same name already exists
    existing_data = get_output_data_by_name(data.name, db)

    if existing_data:
        # Update existing record
        existing_data.description = gemini_response  # Store Gemini response
        existing_data.extra = data.extra
        existing_data.image = data.image
        db.commit()
        db.refresh(existing_data)
        return {"message": "Data updated successfully", "data": existing_data, "gemini_response": gemini_response}
    else:
        # Insert new record
        new_data = models.OutputData(
            name=data.name,
            description=gemini_response,  # Store Gemini response
            extra=data.extra,
            image=data.image,
        )
        db.add(new_data)
        db.commit()
        db.refresh(new_data)
        return {"message": "Data stored successfully", "data": new_data, "gemini_response": gemini_response}

# GET endpoint to retrieve data by name
@app.get("/output_data/{name}")
async def get_output_data_endpoint(name: str, db: Session = Depends(get_db)):
    data = get_output_data_by_name(name, db)
    if not data:
        raise HTTPException(status_code=404, detail="No data found")
    return data
