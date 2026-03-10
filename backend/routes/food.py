from fastapi import APIRouter, HTTPException, Depends
from typing import List
from models import FoodPostModel
from database import db
from auth import verify_token
from datetime import datetime
from bson import ObjectId

router = APIRouter(prefix="/food", tags=["food"])

@router.post("/", response_model=FoodPostModel)
async def create_food_post(post: FoodPostModel, user=Depends(verify_token)):
    post_dict = post.dict(by_alias=True, exclude=["id"])
    post_dict["donor_id"] = user.get("sub")
    post_dict["created_at"] = datetime.utcnow()
    
    new_post = await db.food_posts.insert_one(post_dict)
    created_post = await db.food_posts.find_one({"_id": new_post.inserted_id})
    
    # Convert ObjectId to string for proper serialization
    if created_post:
        created_post["_id"] = str(created_post["_id"])
    
    return created_post

@router.get("/", response_model=List[FoodPostModel])
async def get_food_posts():
    posts = await db.food_posts.find({"status": "active"}).to_list(100)
    return posts

@router.get("/{id}", response_model=FoodPostModel)
async def get_food_post(id: str):
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="Invalid ID")
    
    post = await db.food_posts.find_one({"_id": ObjectId(id)})
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post

@router.post("/{id}/unlock")
async def unlock_food_location(id: str, user=Depends(verify_token)):
    # This endpoint could record that the user unlocked the location
    # For now, it just returns success if authenticated
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="Invalid ID")
        
    post = await db.food_posts.find_one({"_id": ObjectId(id)})
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
        
    return {"message": "Location unlocked", "address": post.get("address")}
