from sqlalchemy import Column, Integer, String
from database import Base

class OutputData(Base):
    __tablename__ = 'output_data'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)  # Keeps name unique to avoid duplicates
    description = Column(String)
    extra = Column(String, nullable=True)
    image = Column(String, nullable=True)  # Stores image URL or base64 string
