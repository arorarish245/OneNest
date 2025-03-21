from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from models.db import users
from bson import ObjectId

router = APIRouter()

# User model schema
class User(BaseModel):
    name: str
    email: str
    password: str

# Register User
@router.post("/register")
def register_user(user: User):
    if users.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="User already exists")
    
    new_user = {"name": user.name, "email": user.email, "password": user.password}
    users.insert_one(new_user)
    
    return {"message": "User registered successfully"}

# Get User Profile
@router.get("/user/{user_id}")
def get_user(user_id: str):
    user = users.find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Convert ObjectId to string
    user["_id"] = str(user["_id"])
    return user

# Update User Profile
@router.put("/user/{user_id}")
def update_user(user_id: str, user: User):
    result = users.update_one(
        {"_id": ObjectId(user_id)},
        {"$set": user.dict()}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {"message": "User updated successfully"}

# Delete User
@router.delete("/user/{user_id}")
def delete_user(user_id: str):
    result = users.delete_one({"_id": ObjectId(user_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {"message": "User deleted successfully"}
