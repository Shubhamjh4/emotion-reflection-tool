# Emotion Reflection Tool

A full-stack Emotion Analysis web application that takes text input from the user, analyzes the emotion using a Python backend, and displays the predicted emotion and confidence score with beautiful, responsive UI.

---

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript + TailwindCSS
- **Backend**: Python (Flask)
- **Styling**: TailwindCSS with custom background + emotion images
- **API Handling**: Fetch + Flask route

---

## 🚀 Full Project Setup

### 🔹 1. Clone the Repository

git clone https://github.com/your-username/emotion-reflection-tool.git
cd emotion-reflection-tool



---

### 🔹 2. Frontend Setup

cd frontend
npm install
npm run dev



✅ Opens at: [http://localhost:5173](http://localhost:5173)

#### Frontend Dependencies:
- react
- react-dom
- typescript
- tailwindcss
- postcss
- autoprefixer

#### Tailwind Setup:
Make sure the following files are present:
- `tailwind.config.js`
- `postcss.config.js`
- `src/index.css` with:
@tailwind base;
@tailwind components;
@tailwind utilities;



---

### 🔹 3. Backend Setup

cd backend
pip install -r requirements.txt
python app.py


✅ Runs at: [http://localhost:5000/analyze](http://localhost:5000/analyze)

#### Backend Dependencies:
- flask
- flask-cors

If `requirements.txt` not created, use:
pip install flask flask-cors



Then create `requirements.txt`:
flask
flask-cors



---

### 📡 API Reference

#### POST `/analyze`

**Request Body:**
```json
{
  "text": "I feel nervous about my first job interview."
}
Response Example:

json
Copy
Edit
{
  "emotion": "Anxious",
  "confidence": 0.85
}

```
## 📁 Folder Structure

```
emotion-reflection-tool/
├── frontend/
│ ├── src/
│ ├── public/
│ ├── tailwind.config.js
│ ├── postcss.config.js
│ └── index.css, main.tsx, App.tsx
├── backend/
│ ├── app.py
│ └── requirements.txt
└── README.md
```
## 🖼️ Features

- Emotion-specific image (e.g., happy, sad, anxious)
- Animated, clean UI with loading states
- Mobile-first responsive design
- Clear API integration using fetch
- Background image with blur-glass styled card

---


<!-- ### Home Page UI:


![Home Page](./assets/screenshot.png)
 -->



<!-- --- -->

## 🙌 Credits

Developed by **Shubhamjh4**