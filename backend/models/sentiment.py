from pydantic import BaseModel
from datetime import datetime

# Define Sentiment Log Schema
class SentimentLog(BaseModel):
    user_id: str
    text: str
    sentiment: str  # "positive", "negative", or "neutral"
    emotion: str
    confidence: float
    timestamp: datetime = datetime.utcnow()  # Default timestamp
