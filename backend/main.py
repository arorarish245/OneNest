from fastapi import FastAPI
from models.user import router as user_router
from models.financial import router as financial_router
from models.chat import router as chat_router
from models.sentiment import router as sentiment_router

app = FastAPI()

# Register the routers
app.include_router(user_router)
app.include_router(financial_router)
app.include_router(chat_router)
app.include_router(sentiment_router)

@app.get("/")
def root():
    return {"message": "OneNest Backend is running!"}
