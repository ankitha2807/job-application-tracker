# Phase 1 — Blueprint

**Ankitha K N** • 4MC22CS012
knankitha73@gmail.com

**Project:** Job Application Tracker with AI Cover Letter Generator
**Track:** Web Development with Gen AI
**Submission Date:** 6th May 2025
**GitHub Repo:** https://github.com/Ankitha2807/job-application-tracker

---

## 1. App Brief & Problem Statement

Fresh graduates and working professionals apply to dozens of jobs across multiple platforms simultaneously. They struggle to:
- Remember which companies they applied to and on which date
- Track the current status of each application (applied, interview, offer, rejected)
- Write tailored, professional cover letters for each job description
- Follow up at the right time because there is no centralized record

**Problem Statement:** Job seekers have no single tool to track their applications end-to-end and lack the time to write personalized cover letters — leading to missed opportunities and poor response rates.

**Proposed Solution:** A full-stack web application that lets users:
- Register and securely log in to a personal account
- Add, edit, and delete job applications with status tracking
- View all applications in a Kanban-style board sorted by status
- See live dashboard analytics — total applied, interviews, offers
- Generate a tailored AI cover letter by entering the job description and skills

---

## 2. User Stories

| # | User Story | Acceptance Criteria |
|---|------------|---------------------|
| US-01 | As a user, I want to register with email and password so I can have my own account | Signup form saves user, returns JWT |
| US-02 | As a user, I want to log in securely so only I can see my data | Login returns JWT, protects all routes |
| US-03 | As a user, I want to add a job application with company, role, date and status | POST /api/jobs saves record to MySQL |
| US-04 | As a user, I want to update the status of an application as it progresses | Status changes via PUT and updates on Kanban |
| US-05 | As a user, I want to delete applications I no longer need | DELETE /api/jobs/{id} removes record |
| US-06 | As a user, I want to see all my applications in a Kanban board by status | Dashboard shows 5 status columns |
| US-07 | As a user, I want to see a summary of how many applications are in each stage | Stats cards show counts from /api/dashboard/stats |
| US-08 | As a user, I want to generate a cover letter by entering the job description and my skills | Gemini API returns tailored letter in modal |
| US-09 | As a user, I want to copy the generated cover letter with one click | Copy button copies text to clipboard |
| US-10 | As a user, I want to log out so my session ends securely | Token is cleared, user redirected to login |

---

## 3. Architecture Diagram

Frontend → Backend → Database / AI API

- Frontend: React + Vite + Tailwind
- Backend: Spring Boot 3 + Java 17
- Database: MySQL
- AI API: Gemini via OpenAI-compatible endpoint
- Auth: JWT + BCrypt

---

## 4. Tech Stack & Prerequisites

| Layer | Technology | Why chosen |
|---|---|---|
| Frontend | React 18 + Vite | Fast dev server, component-based UI |
| Styling | Tailwind CSS | Utility-first, rapid prototyping |
| Routing | React Router v6 | Client-side navigation, protected routes |
| HTTP Client | Axios | JWT interceptor, clean API calls |
| Backend | Spring Boot 3 | Industry-standard Java REST framework |
| Language | Java 17 | LTS version, modern features |
| Security | Spring Security + JWT | Stateless auth, BCrypt password hashing |
| ORM | Spring Data JPA + Hibernate | Database abstraction, entity mapping |
| Database | MySQL | Relational DB — user and job data |
| AI API | Gemini API | Free, fast, OpenAI-compatible endpoint |
| Build Tool | Maven | Dependency management for Spring Boot |
| Version Control | Git + GitHub | Daily commits, portfolio visibility |
| IDE | VS Code | Extensions for Java, React, Spring Boot |

**Prerequisites**
- Node.js v18+ and npm
- Java JDK 17
- MySQL Server (local)
- Maven
- Git
- VS Code
- Gemini API key

---

## 5. Database Schema Draft

**users**
- id: BIGINT (PK, AUTO)
- name: VARCHAR(100)
- email: VARCHAR(100) UNIQUE
- password: VARCHAR(255)

**job_applications**
- id: BIGINT (PK, AUTO)
- user_id: BIGINT (FK → users)
- company: VARCHAR(150)
- role: VARCHAR(150)
- status: ENUM(SAVED, APPLIED, INTERVIEW, OFFER, REJECTED)
- job_description: TEXT
- applied_date: DATE
- notes: TEXT

---

## 6. Wireframe / Screen Plan

| Screen | Route | Key Elements |
|---|---|---|
| Landing Page | / | Hero, feature cards, CTA → signup |
| Sign Up | /signup | Name, email, password form |
| Login | /login | Email + password, JWT stored |
| Dashboard | /dashboard | Stats cards, Kanban board, Add Job button |
| Cover Letter Modal | overlay | Job description input → AI output → Copy |

---

## 7. Features — Planned

**Core MVP Features**
- ✅ User registration with email + password (BCrypt)
- ✅ User login with JWT session management
- ✅ Add job application (company, role, date, status, description)
- ✅ Edit and delete job applications
- ✅ Kanban board view — status columns
- ✅ Dashboard analytics — counts per status
- ✅ AI Cover Letter Generator
- ✅ Copy generated cover letter to clipboard
- ✅ JWT Axios interceptor for protected API calls
- ✅ Landing / Home page with CTA

**Enhancement Features**
- ✅ Show logged-in user's name in the navbar
- 🔲 Search and filter jobs by company or status
- 🔲 Loading spinners on API calls
- 🔲 Empty state UI when no jobs are added yet
- 🔲 Save generated cover letter to the job record
- 🔲 Better error messages on login/signup failure
- 🔲 Mobile responsive design polish
- 🔲 Dark / Light theme toggle
- 🔲 Drag and drop Kanban status updates
- 🔲 Export cover letter as PDF download

---

## 8. Success Criteria

- SC-1: User can register, log in, add/edit/delete job applications, and log out without errors
- SC-2: AI cover letter generator returns a tailored letter for any job description entered
- SC-3: Dashboard accurately reflects application counts per status

---

## 9. Approach — How We Will Build This

1. Set up Spring Boot project with Web, JPA, MySQL, Security, Lombok
2. Configure MySQL database connection and schema
3. Build user auth endpoints with BCrypt and JWT
4. Build job CRUD REST API with user-level isolation
5. Build dashboard stats endpoint per authenticated user
6. Integrate Gemini API for cover letter generation
7. Set up React + Vite frontend with Tailwind, router, Axios
8. Build AuthContext for JWT state management
9. Build dashboard page and cover letter modal
10. Build landing page and polish UI
11. Test all endpoints, fix bugs, write README, push to GitHub

---

## 10. Day-by-Day Plan

- Day 1: Backend + auth endpoints running
- Day 2: Job CRUD APIs + frontend login/signup/dashboard
- Day 3: AI cover letter flow and Kanban rendering
- Day 4: Landing page + enhancements
- Day 5: End-to-end testing and README

---

## 11. Final Deliverables

- Deployed live URL
- Public GitHub repository with commits and README
- Walkthrough video
- API documentation
