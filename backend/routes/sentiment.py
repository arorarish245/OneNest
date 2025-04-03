from fastapi import APIRouter, HTTPException
from models.sentiment import SentimentLog
from pydantic import BaseModel
from datetime import datetime
from ml_models.sentiment import predict_sentiment, categorize_emotion
from motor.motor_asyncio import AsyncIOMotorClient
import openai
import os
import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize FastAPI Router
router = APIRouter()

# Gemini API Key
API_KEY = os.getenv("GOOGLE_GEMINI_API_KEY")

# Gemini model name
MODEL_NAME = "gemini-1.5-flash-001"

# Connect to MongoDB (Async)
MONGO_URI = os.getenv("MONGODB_URI")
client = AsyncIOMotorClient(MONGO_URI)
db = client["OneNest"]
sentiment_logs = db["sentiments"]

# Define Request Schema for Sentiment Analysis
class SentimentRequest(BaseModel):
    user_id: str
    text: str

# **Perform Sentiment Analysis & Store Log**
@router.post("/analyze")
async def analyze_and_store_sentiment(request: SentimentRequest):
    """
    Analyze user input, categorize sentiment & emotion, store result, and return AI-powered coping tips.
    """
    try:
        # Step 1: Predict sentiment using ML model
        result = predict_sentiment(request.text)

        # ✅ Step 2: Categorize Emotion BEFORE using it
        emotion = categorize_emotion(request.text, result["sentiment"])  

        # Step 3: Store result in MongoDB
        log = SentimentLog(
            user_id=request.user_id,
            text=request.text,
            sentiment=result["sentiment"],
            emotion=emotion,  # ✅ `emotion` is now correctly defined
            confidence=result["confidence"],
            timestamp=datetime.utcnow()
        )
        await sentiment_logs.insert_one(log.dict())  # Async insert

        # Step 4: Provide AI Coping Tips
        coping_tip = await generate_coping_tip(request.text, result["sentiment"], emotion)

        # Step 5: Trigger Emergency Support
        emergency_support = None
        if result["sentiment"] == "negative" and result["confidence"] > 0.85:
            emergency_support = {
                "message": "It seems you're feeling very low. You are not alone! Reach out to support.",
                "resources": [
                    {"name": "Mental Health Helpline", "contact": "1800-599-0019"},
                    {"name": "Crisis Text Line", "contact": "Text HOME to 741741"}
                ]
            }

        return {
            "message": "Sentiment analyzed successfully",
            "sentiment": result["sentiment"],
            "emotion": emotion,  # ✅ Emotion is correctly returned
            "confidence": result["confidence"],
            "coping_tip": coping_tip,
            "emergency_support": emergency_support
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")


# **Retrieve Sentiment Logs**
@router.get("/logs/{user_id}")
async def get_sentiment_logs(user_id: str):
    """
    Fetch sentiment history for a specific user.
    """
    try:
        logs = await sentiment_logs.find({"user_id": user_id}).to_list(None)

        # Convert MongoDB ObjectId to string
        for log in logs:
            log["_id"] = str(log["_id"])

        return logs

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")


# AI-Powered Coping Message Generator
async def generate_coping_tip(user_text, sentiment, emotion):
    """
    Generates a response from Gemini based on sentiment & emotion.
    - Negative -> Coping tip based on stress/loneliness/guilt.
    - Neutral -> Self-reflection suggestion.
    - Positive -> Encouraging message.
    """
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL_NAME}:generateContent?key={API_KEY}"
    headers = {"Content-Type": "application/json"}

    if sentiment == "negative":
        if emotion == "stress":
            prompt = f'A single parent is feeling extremely stressed after saying: "{user_text}". Provide a short, encouraging tip for stress relief (e.g., time management, relaxation techniques).'
        elif emotion == "loneliness":
            prompt = f'A single parent feels lonely after saying: "{user_text}". Provide a short tip to help them feel more connected (e.g., support groups, self-care).'
        elif emotion == "guilt":
            prompt = f'A single parent is feeling guilty after saying: "{user_text}". Provide a brief short reassurance that they are doing their best and advice from child psychologists.'
        else:
            prompt = f'A person is feeling down after saying: "{user_text}". Provide a short, encouraging coping tip.'

    elif sentiment == "neutral":
        prompt = f'A person seems to be in a neutral mood after saying: "{user_text}". Provide a brief self-reflection suggestion to help them feel more engaged or mindful.'

    elif sentiment == "positive":
        if emotion == "joy":
            prompt = f'A single parent feels joy after saying: "{user_text}". Provide a short uplifting message encouraging them to celebrate this moment with their child.'
        else:
            prompt = f'A person is feeling positive after saying: "{user_text}". Provide a short, uplifting encouragement message to reinforce their positivity.'

    data = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {"temperature": 0.7}
    }

    try:
        response = requests.post(url, json=data, headers=headers)
        if response.status_code == 200:
            full_response = response.json()
            # print(f"DEBUG: Raw Response from Gemini -> {full_response}")  # Debugging

            candidates = full_response.get("candidates", [])
            if candidates:
                content = candidates[0].get("content", {})
                parts = content.get("parts", [])
                if parts:
                    return parts[0].get("text", "You're doing great! Take it one step at a time. ❤️")

        return "You're doing great! Take it one step at a time. ❤️"  # Fallback response

    except Exception as e:
        print(f"ERROR: {e}")
        return "You're doing great! Take it one step at a time. ❤️"  # Default message in case of failure
