from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import datetime
from bson import ObjectId

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __get_pydantic_json_schema__(cls, core_schema, handler):
        json_schema = handler(core_schema)
        json_schema.update(type="string")
        return json_schema

class UserModel(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    supabase_id: str
    phone: Optional[str] = None
    email: Optional[EmailStr] = None
    name: Optional[str] = None
    rating: float = 5.0
    donations_count: int = 0
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}

class FoodPostModel(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    donor_id: str
    title: str
    description: str
    quantity: str
    image_url: Optional[str] = None
    pickup_time: datetime
    latitude: float
    longitude: float
    address: str
    status: str = "active" # active, claimed, completed
    claimed_by: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}

class TransactionModel(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    post_id: str
    donor_id: str
    receiver_id: str
    status: str = "pending" # pending, confirmed
    rating: Optional[int] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}
