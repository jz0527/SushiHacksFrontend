from fastapi import FastAPI, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from typing import Optional
from database import SessionLocal, engine
import models
from fastapi.middleware.cors import CORSMiddleware

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Allow CORS from the frontend URL
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic model for input data
class OutputDataRequest(BaseModel):
    name: str
    description: str
    extra: str = None
    image: str = None

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
    """
    Retrieve output data from the database by name.
    
    Args:
        name (str): The name of the output data to retrieve.
        db (Session): The database session.
    
    Returns:
        Optional[models.OutputData]: The retrieved output data or None if not found.
    """
    return db.query(models.OutputData).filter(models.OutputData.name == name).first()

# POST endpoint to submit or update data
@app.post("/submit_output/")
async def submit_output(data: OutputDataRequest, db: Session = Depends(get_db)):
    # Check if a record with the same name already exists
    existing_data = get_output_data_by_name(data.name, db)
    
    if existing_data:
        # Update existing record
        existing_data.description = data.description
        existing_data.extra = data.extra
        existing_data.image = data.image
        db.commit()
        db.refresh(existing_data)
        return {"message": "Data updated successfully", "data": existing_data}
    else:
        # Insert new record if no existing record is found
        new_data = models.OutputData(
            name=data.name,
            description=data.description,
            extra=data.extra,
            image=data.image,
        )
        db.add(new_data)
        db.commit()
        db.refresh(new_data)
        return {"message": "Data stored successfully", "data": new_data}
<<<<<<< HEAD
    
# the data goes here, the get method puts the user input to this file path
=======

# GET endpoint to retrieve data by name
>>>>>>> 891bef88 (Fetch product ID to display on Output.jsx)
@app.get("/output_data/{name}")
async def get_output_data_endpoint(name: str, db: Session = Depends(get_db)):
    data = get_output_data_by_name(name, db)
    if not data:
        raise HTTPException(status_code=404, detail="No data found")
    return data
