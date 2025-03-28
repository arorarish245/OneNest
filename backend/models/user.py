from fastapi import APIRouter
from pymongo import MongoClient
from passlib.context import CryptContext
from dotenv import load_dotenv
import os

# Environment setup
load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client["OneNest"]
users = db["users"]

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# ✅ Create the router instance
router = APIRouter()

# Example route to test
@router.get("/test")
async def test():
    return {"message": "User router is working!"}
