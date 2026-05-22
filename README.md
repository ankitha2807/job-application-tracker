# Job Application Tracker 🎯
> Track job applications and generate AI-powered cover letters — built with React, Spring Boot, MySQL and Groq AI.

![Status](https://img.shields.io/badge/Status-Active-brightgreen)
![Stack](https://img.shields.io/badge/Stack-React%20%7C%20Spring%20Boot%20%7C%20MySQL-blue)
![AI](https://img.shields.io/badge/AI-Groq%20Llama%203-orange)

---

## ✨ Features

| Feature | Status |
|---|---|
| Secure signup / login with JWT | ✅ Done |
| Add, edit, delete job applications | ✅ Done |
| Kanban board by status (Applied → Interview → Offer → Rejected) | ✅ Done |
| Dashboard analytics (total, interviews, offers, rejections) | ✅ Done |
| AI Cover Letter Generator (Groq API — free) | ✅ Done |
| Landing page with hero + feature cards | ✅ Done |
| Search and filter applications | ✅ Done |
| Mobile responsive design | ✅ Done |
| Save cover letters per job | ✅ Done |

---

## 🛠️ Tech Stack

**Frontend**
- React 18 + Vite
- Tailwind CSS
- React Router
- Axios (with JWT interceptor)

**Backend**
- Spring Boot 3 + Java 17
- Spring Security + JWT
- Spring Data JPA + Hibernate
- MySQL

**AI**
- Gemini API (Llama 3 — free tier)

---

## 🚀 How to Run Locally

### Prerequisites
- Java 17+
- Node.js 18+
- MySQL running locally
- Groq API key (free at console.groq.com)

### Backend
```bash
cd backend
```
Edit `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/jobtracker
spring.datasource.username=root
spring.datasource.password=yourpassword
groq.api.key=your_groq_api_key_here
```
Then run:
```bash
./mvnw spring-boot:run
```
Backend starts at `http://localhost:8080`

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend starts at `http://localhost:5173`

---

## 📁 Project Structure

```
job-application-tracker/
├── backend/
│   └── src/main/java/
│       ├── auth/          # JWT, BCrypt, SecurityConfig
│       ├── job/           # JobApplication entity, service, controller
│       ├── dashboard/     # Stats endpoint
│       └── coverletter/   # Groq AI integration
├── frontend/
│   └── src/
│       ├── components/    # JobForm, CoverLetterModal, Navbar
│       ├── context/       # AuthContext
│       ├── pages/         # Login, Signup, Dashboard, Landing
│       └── api/           # Axios instance with interceptor
└── README.md
```

## 🔮 Future Enhancements

- Drag-and-drop Kanban board
- Export cover letter as PDF
- Follow-up reminders and deadline alerts
- Resume parsing with AI
- Docker + CI/CD pipeline
- Email notifications

---

## 👨‍💻 Built By

Developed as part of the **FutureAcad Internship 2026**

---
