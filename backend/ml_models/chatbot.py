import os
import openai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

def ask_chatbot(prompt):
    """
    Sends user input to OpenAI GPT model and returns the response.
    """
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}]
        )
        
        message = response["choices"][0]["message"]["content"]
        return message

    except Exception as e:
        return f"Error: {str(e)}"
