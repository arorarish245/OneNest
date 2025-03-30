from fastapi import FastAPI
from models import user
from routes.auth import router as auth_router  # ✅ Import auth router
from models.user import router as user_router
from routes.financial import router as financial_router
from routes.chat import router as chat_router
from routes.sentiment import router as sentiment_router
from fastapi.middleware.cors import CORSMiddleware

# Create FastAPI app
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],         # Allow all origins (for testing)
    allow_credentials=True,
    allow_methods=["*"],         # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],         # Allow all headers
)

# Register routers with prefixes
app.include_router(auth_router, prefix="/api/auth")
app.include_router(user_router, prefix="/api/user")
app.include_router(financial_router, prefix="/api/financial")
app.include_router(chat_router, prefix="/api/chat")
app.include_router(sentiment_router, prefix="/api/sentiment")


@app.get("/")
def root():
    return {"message": "OneNest Backend is running!"}
