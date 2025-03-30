from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from models.chatbot import generate_response  # Your Gemini model logic

router = APIRouter()

# Define request body model
class ChatRequest(BaseModel):
    prompt: str

@router.post("/")
async def chat(request: ChatRequest):
    response = generate_response(request.prompt)
    return {"response": response}
