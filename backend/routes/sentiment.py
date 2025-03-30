from fastapi import APIRouter, HTTPException
from models.db import sentiment_logs  # MongoDB connection
from pydantic import BaseModel
from datetime import datetime
from ml_models.sentiment_model import predict_sentiment  # Import ML model

# FastAPI router
router = APIRouter()

# Define schema for Sentiment Request
class SentimentRequest(BaseModel):
    user_id: str
    text: str  # User input text

# Perform Sentiment Analysis & Store Log
@router.post("/sentiment-logs")
def analyze_and_store_sentiment(request: SentimentRequest):
    """
    Takes user text, performs sentiment analysis, and stores the result in MongoDB.
    """
    try:
        # Step 1: Perform Sentiment Analysis
        result = predict_sentiment(request.text)

        # Step 2: Store the result in MongoDB
        log = {
            "user_id": request.user_id,
            "text": request.text,
            "sentiment": result["sentiment"],
            "confidence": result["confidence"],
            "timestamp": datetime.utcnow()
        }
        
        sentiment_logs.insert_one(log)

        return {
            "message": "Sentiment analysis completed and log saved",
            "sentiment": result["sentiment"],
            "confidence": result["confidence"]
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

# ✅ Retrieve Sentiment Logs
@router.get("/sentiment-logs/{user_id}")
def get_sentiment_logs(user_id: str):
    """
    Retrieves sentiment logs for a specific user.
    """
    try:
        logs = list(sentiment_logs.find({"user_id": user_id}))

        # Convert MongoDB ObjectId to string
        for log in logs:
            log["_id"] = str(log["_id"])

        return logs

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")
