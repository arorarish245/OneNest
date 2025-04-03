import os
import requests
import json
import re  # ✅ Import regex for better extraction
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("GOOGLE_GEMINI_API_KEY")
MODEL_NAME = "gemini-1.5-flash-001"

def predict_sentiment(text: str):
    """
    Uses Gemini API to analyze sentiment and return structured JSON.
    """
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL_NAME}:generateContent?key={API_KEY}"
    headers = {"Content-Type": "application/json"}

    prompt = f"""
    Analyze the sentiment of the following text:
    "{text}"
    Provide the sentiment as one of: "positive", "negative", or "neutral".
    Also return a confidence score between 0 and 1.
    Respond in JSON format, without Markdown or code block formatting.
    Example:
    {{"sentiment": "negative", "confidence": 0.95}}
    """

    data = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {"temperature": 0.7}
    }

    response = requests.post(url, json=data, headers=headers)

    if response.status_code == 200:
        try:
            # Extract API response safely
            full_response = response.json()
            print(f"DEBUG: Full Gemini API Response -> {full_response}")  # Debugging

            candidates = full_response.get("candidates", [])
            if candidates:
                content = candidates[0].get("content", {})
                parts = content.get("parts", [])

                if parts:
                    raw_text = parts[0].get("text", "").strip()
                    print(f"DEBUG: Extracted Text from Gemini -> {raw_text}")  # Debugging

                    # **Use regex to extract valid JSON inside backticks**
                    json_match = re.search(r'\{.*\}', raw_text, re.DOTALL)

                    if json_match:
                        cleaned_json = json_match.group(0)  # Extract only JSON part
                        sentiment_data = json.loads(cleaned_json)

                        return {
                            "sentiment": sentiment_data.get("sentiment", "neutral"),
                            "confidence": round(float(sentiment_data.get("confidence", 0.5)), 2)
                        }

        except json.JSONDecodeError:
            print("ERROR: Gemini response is not valid JSON. Returning default sentiment.")
        except Exception as e:
            print(f"ERROR: Exception while parsing response -> {e}")

    else:
        print(f"ERROR: Gemini API Request Failed -> {response.status_code} | {response.text}")

    return {"sentiment": "neutral", "confidence": 0.5}  # Default fallback


def categorize_emotion(text: str, sentiment: str) -> str:
    """
    Categorizes emotion based on sentiment and specific keywords.
    """
    text = text.lower()

    if sentiment == "negative":
        if re.search(r"(stressed|overwhelmed|pressure|too much to handle|anxious|tired)", text):
            return "stress"
        elif re.search(r"(lonely|alone|no one understands|isolated|left out|unloved)", text):
            return "loneliness"
        elif re.search(r"(guilt|not enough|bad parent|should have done better|regret|self-doubt)", text):
            return "guilt"
        return "negative"  # Default for other negative cases

    elif sentiment == "positive":
        if re.search(r"(happy|proud|joyful|grateful|thankful|blessed|excited)", text):
            return "joy"
        return "positive"  # Default for other positive cases

    return "neutral"  # Default for neutral cases