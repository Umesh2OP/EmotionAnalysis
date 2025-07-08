# 🧠 Emotion Reflection Tool

A minimal, intuitive web tool that allows users to reflect on their thoughts and receive a simulated emotion analysis. Built with **React + TypeScript (frontend)** and **FastAPI (backend)**.

---



---

## ✨ Features

- ✍️ Write and submit a reflection
- 🧠 Receive a fake emotion + confidence score (simulated)
- 📊 Confidence shown via a progress bar
- 🎭 Emotion icons for intuitive feedback
- ⚡ Smooth UX with loading states, error handling
- 📱 Fully responsive design

---

## 🔧 Tech Stack

### 🖼 Frontend
- React + TypeScript
- TailwindCSS
- Framer Motion (for animations)
- Axios
- React Icons

### 🔙 Backend
- FastAPI
- Pydantic
- CORS Middleware

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/emotion-reflection-tool.git
cd emotion-reflection-tool

Backend Setup-
cd backend
python -m venv venv
venv\Scripts\activate       # or source venv/bin/activate on Mac/Linux
pip install fastapi uvicorn pydantic
uvicorn main:app --reload
API will run on: http://localhost:8000/analyze

Frontend Setup
cd frontend
npm install
npm run dev
Frontend will run on: http://localhost:5173
📦 API Endpoint
POST /analyze
Request Body:

json
Copy
Edit
{
  "text": "I feel a bit anxious before my interview."
}
Response:

json
Copy
Edit
{
  "emotion": "Anxious",
  "confidence": 0.87
}
🧪 Example Emotions (Simulated)
The backend uses basic keyword matching logic (no ML) to simulate responses like:

"Happy" if input contains "great", "awesome", etc.

"Anxious" if input contains "nervous", "worried", etc.

"Sad" if input contains "lonely", "disappointed", etc.

📹 (Optional) Walkthrough