from fastapi import FastAPI, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models
from fastapi.middleware.cors import CORSMiddleware

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class OutputDataRequest(BaseModel):
    name: str
    description: str
    extra: str = None
    image: str = None

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"message": "Welcome to FastAPI"}

@app.post("/submit_output/")
async def submit_output(data: OutputDataRequest, db: Session = Depends(get_db)):
    # Check if a record with the same name already exists
    existing_data = db.query(models.OutputData).filter(models.OutputData.name == data.name).first()
    
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

@app.get("/output_data/{name}")
async def get_output_data(name: str, db: Session = Depends(get_db)):
    data = db.query(models.OutputData).filter(models.OutputData.name == name).first()
    if not data:
        raise HTTPException(status_code=404, detail="No data found")
    return data
