from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_methods=["*"],
    allow_headers=["*"],
)

class TextInput(BaseModel):
    text: str

@app.post("/analyze")
def analyze_emotion(data: TextInput):
    text = data.text.lower()

    if any(word in text for word in ["nervous", "anxious", "worried"]):
        emotion = "Anxious"
        confidence = 0.87
    elif any(word in text for word in ["happy", "joyful", "excited"]):
        emotion = "Happy"
        confidence = 0.93
    elif any(word in text for word in ["angry", "mad", "furious"]):
        emotion = "Angry"
        confidence = 0.89
    elif any(word in text for word in ["sad", "upset", "depressed"]):
        emotion = "Sad"
        confidence = 0.84
    else:
        emotion = "Neutral"
        confidence = 0.70

    return {
        "emotion": emotion,
        "confidence": round(confidence, 2)
    }