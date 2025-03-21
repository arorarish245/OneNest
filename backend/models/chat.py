from fastapi import APIRouter, HTTPException
from models.db import chat_history  # MongoDB connection
from pydantic import BaseModel
from datetime import datetime
from ml_models.chatbot import ask_chatbot  # Import OpenAI chatbot function

# FastAPI router
router = APIRouter()

# Define schema for chat request
class ChatRequest(BaseModel):
    user_id: str
    message: str

# ✅ Chat with AI & Store Chat History
@router.post("/chat")
def chat_with_ai(request: ChatRequest):
    """
    Chats with the AI, stores the conversation in MongoDB.
    """
    try:
        # Step 1: Get chatbot response
        response = ask_chatbot(request.message)

        # Step 2: Store the chat in MongoDB
        entry = {
            "user_id": request.user_id,
            "message": request.message,
            "response": response,
            "timestamp": datetime.utcnow()
        }

        chat_history.insert_one(entry)

        return {
            "message": "Chat completed and saved successfully",
            "user_message": request.message,
            "bot_response": response
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

# ✅ Retrieve Chat History
@router.get("/chat-history/{user_id}")
def get_chat_history(user_id: str):
    """
    Retrieves chat history for a specific user.
    """
    try:
        chats = list(chat_history.find({"user_id": user_id}))

        # Convert MongoDB ObjectId to string
        for chat in chats:
            chat["_id"] = str(chat["_id"])

        return chats

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")
