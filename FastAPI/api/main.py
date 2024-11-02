from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, Dict

app = FastAPI()

# Adding CORS middleware to allow communication between frontend (React) and backend (FastAPI)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow requests from the frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data model for items in the output
class OutputData(BaseModel):
    name: str
    description: str
    extra: Optional[str] = None  # Optional field for additional info
    image: Optional[str] = None  # Optional field for image URL or base64-encoded image

data_store: Dict[str, OutputData] = {}

# Basic route
@app.get("/")
def read_root():
    return {"message": "Welcome to FastAPI"}

@app.post("/submit_output/")
async def submit_output(data: OutputData):
    # Store the received data using the name as the key
    data_store[data.name] = data
    return {"message": "Data received successfully", "data": data}

@app.get("/output_data/{name}")
async def get_output_data(name: str):
    data = data_store.get(name)
    if not data:
        raise HTTPException(status_code=404, detail="No data found")
    return data

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)