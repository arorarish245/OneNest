import os
from pymongo import MongoClient
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# MongoDB connection string
MONGO_URI = os.getenv("MONGODB_URI")

# Connect to MongoDB
client = MongoClient(MONGO_URI)
db = client["OneNest"]

# Collections
users = db["users"]
financial_schemes = db["financial_schemes"]
chat_history = db["chat_history"]
sentiment_logs= db["sentiments"]
resources = db["resources"]