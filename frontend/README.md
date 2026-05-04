# Job Application Tracker 🎯

A full-stack web app to track job applications and generate 
AI-powered cover letters.

## Tech Stack
- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Spring Boot 3 + Java 17
- **Database:** MySQL
- **AI:** Groq API (Llama 3)
- **Auth:** JWT + BCrypt

## Features
- ✅ Secure login/signup with JWT
- ✅ Add, edit, delete job applications
- ✅ Kanban board by status
- ✅ Dashboard analytics
- ✅ AI Cover Letter Generator

## How to Run
### Backend
cd backend
# Set your MySQL and Groq API key in application.properties
./mvnw spring-boot:run

### Frontend
cd frontend
npm install
npm run dev