# ExamPro — Online Examination & Result Management System

A full-stack web application built with **React.js** + **Spring Boot** + **H2 Database**.

---

## Project Structure

```
Online Examination and Result Management System/
├── backend/          ← Spring Boot REST API
└── frontend/         ← React.js UI
```

---

## How to Run

### 1 — Backend (Spring Boot)

**Requirements:** Java 17+, Maven 3.8+

```bash
cd backend
mvn spring-boot:run
```

- API runs at: `http://localhost:8080`
- H2 Console: `http://localhost:8080/h2-console`
  - JDBC URL: `jdbc:h2:mem:examdb`
  - Username: `sa` | Password: *(empty)*

### 2 — Frontend (React)

**Requirements:** Node.js 18+, npm

```bash
cd frontend
npm install       # first time only
npm start
```

- App runs at: `http://localhost:3000`

---

## Login

| Field    | Value      |
|----------|------------|
| Username | `admin`    |
| Password | `admin123` |

---

## Features

| Module      | Operations          |
|-------------|---------------------|
| Auth        | Login / Logout      |
| Students    | Add, View, Edit, Delete |
| Exams       | Add, View, Edit, Delete |
| Questions   | Add, View, Edit, Delete (MCQ) |
| Results     | Add, View, Edit, Delete + Auto Grade |

---

## OOP Concepts Demonstrated

| Concept        | Where                                                    |
|----------------|----------------------------------------------------------|
| Encapsulation  | `User`, `Student`, `Exam`, `Question`, `Result` — private fields + getters/setters |
| Inheritance    | `MCQQuestion extends Question`                           |
| Polymorphism   | `MCQQuestion.isCorrect()` overrides `Question.isCorrect()` |
| Polymorphism   | `Result.calculateGrade()` — different grade for different marks |
| Abstraction    | Service layer abstracts repository details from controllers |

---

## REST API Endpoints

| Method | Endpoint                    | Description           |
|--------|-----------------------------|-----------------------|
| POST   | `/api/auth/login`           | Admin login           |
| GET    | `/api/students`             | List all students     |
| POST   | `/api/students`             | Create student        |
| PUT    | `/api/students/{id}`        | Update student        |
| DELETE | `/api/students/{id}`        | Delete student        |
| GET    | `/api/exams`                | List all exams        |
| POST   | `/api/exams`                | Create exam           |
| PUT    | `/api/exams/{id}`           | Update exam           |
| DELETE | `/api/exams/{id}`           | Delete exam           |
| GET    | `/api/questions`            | List all questions    |
| POST   | `/api/questions`            | Create question (MCQ) |
| PUT    | `/api/questions/{id}`       | Update question       |
| DELETE | `/api/questions/{id}`       | Delete question       |
| GET    | `/api/results`              | List all results      |
| POST   | `/api/results`              | Create result         |
| PUT    | `/api/results/{id}`         | Update result         |
| DELETE | `/api/results/{id}`         | Delete result         |

---

## Tech Stack

- **Frontend:** React 18, React Router v6, Axios, CSS (custom)
- **Backend:** Spring Boot 3.2, Spring Data JPA, Spring Web
- **Database:** H2 (in-memory)
- **Build:** Maven (backend), npm (frontend)
