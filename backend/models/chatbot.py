import os
import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Gemini API Key
API_KEY = os.getenv("GOOGLE_GEMINI_API_KEY")

# Gemini model name
MODEL_NAME = "gemini-1.5-flash-001"

def generate_response(prompt):
    """Generates a concise and accurate response from the Gemini model."""
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL_NAME}:generateContent?key={API_KEY}"

    headers = {
        "Content-Type": "application/json"
    }

    # Modify the prompt to request a concise response
    concise_prompt = f"{prompt}\n\nProvide a short, concise response."

    data = {
        "contents": [{"parts": [{"text": concise_prompt}]}],
        "generationConfig": {
            "temperature": 0.7
        }
    }

    response = requests.post(url, json=data, headers=headers)

    if response.status_code == 200:
        # Extract and return the response
        full_response = response.json().get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "No response.")
        return full_response
    else:
        return f"Error: {response.status_code} - {response.text}"
