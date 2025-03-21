import joblib
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
import os

# ✅ Ensure the directory exists before saving the model
model_dir = "backend/ml_models"
os.makedirs(model_dir, exist_ok=True)

# Paths for model and vectorizer
model_path = os.path.join(model_dir, "sentiment_model.pkl")
vectorizer_path = os.path.join(model_dir, "vectorizer.pkl")

# ========== 1. TRAINING AND SAVING THE MODEL ==========
if not os.path.exists(model_path) or not os.path.exists(vectorizer_path):
    print("Training the sentiment model...")

    # Sample dataset
    data = [
        ("I am very happy today!", "positive"),
        ("I love my family", "positive"),
        ("Life is beautiful", "positive"),
        ("I feel sad and alone", "negative"),
        ("I am disappointed", "negative"),
        ("I am stressed and worried", "negative"),
        ("It's an okay day", "neutral"),
        ("I feel normal", "neutral"),
    ]

    # Splitting the dataset
    texts, labels = zip(*data)

    # Text vectorization
    vectorizer = CountVectorizer()
    X = vectorizer.fit_transform(texts)

    # Splitting into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, labels, test_size=0.2, random_state=42)

    # Model training
    model = LogisticRegression()
    model.fit(X_train, y_train)

    # Save the model and vectorizer
    joblib.dump(model, model_path)
    joblib.dump(vectorizer, vectorizer_path)

    # Evaluate the model
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    print(f"Model Accuracy: {accuracy * 100:.2f}%")

else:
    print("Model already trained. Using saved model...")

# ========== 2. INFERENCE FUNCTION FOR PREDICTION ==========

# Load the model and vectorizer
model = joblib.load(model_path)
vectorizer = joblib.load(vectorizer_path)

def predict_sentiment(text):
    """
    Predicts the sentiment of a given text.
    """
    X = vectorizer.transform([text])
    prediction = model.predict(X)[0]

    # Confidence score
    confidence = max(model.predict_proba(X)[0])

    return {
        "sentiment": prediction,
        "confidence": round(confidence, 2)
    }
