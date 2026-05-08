# Product Requirements Document (PRD)

# Online Examination and Result Management System

## Student Version – React + Spring Boot + H2 Database

---

# 1. Project Overview

## Project Title
Online Examination and Result Management System

## Project Type
Web-Based Examination Management System

## Technology Stack
- Frontend: React.js
- Backend: Spring Boot
- Database: H2 Database
- Version Control: GitHub

---

# 2. Project Purpose

The purpose of this project is to develop a simple Online Examination and Result Management System using React, Spring Boot, and H2 Database.

The system helps manage:
- Students
- Exams
- Questions
- Results

This project is developed for academic purposes to demonstrate:
- CRUD Operations
- REST API Development
- Object-Oriented Programming Concepts
- Database Integration
- Authentication System

---

# 3. Project Objectives

## Main Objective
To develop a simple online examination management system using React and Spring Boot.

## Specific Objectives
- Allow admin login
- Manage student details
- Manage examination records
- Manage questions
- Manage student results
- Store data using H2 Database

---

# 4. User Roles

## Admin
Admin can:
- Login to the system
- Manage students
- Manage exams
- Manage questions
- Manage results

---

# 5. Functional Requirements

---

# 5.1 Login Module

## Description
Handles admin authentication.

## Features
- Login
- Logout

## Login Fields
- Username
- Password

## UI Pages
- Login Page
- Dashboard

## OOP Concepts
- Encapsulation using User class

---

# 5.2 Student Management Module (FULL CRUD)

## Description
Manages student records.

## Features
- Add student
- View students
- Update student details
- Delete students

## CRUD Operations

| Operation | Description |
|---|---|
| Create | Add student |
| Read | View students |
| Update | Update student details |
| Delete | Remove student |

## Student Fields
- Student ID
- Student Name
- Email
- Course
- Contact Number

## UI Pages
- Add Student Page
- Student List Page
- Edit Student Page

## OOP Concepts
- Encapsulation using Student class

---

# 5.3 Examination Management Module (FULL CRUD)

## Description
Manages examination details.

## Features
- Add exam
- View exams
- Update exam details
- Delete exam

## CRUD Operations

| Operation | Description |
|---|---|
| Create | Add exam |
| Read | View exams |
| Update | Update exam details |
| Delete | Remove exam |

## Exam Fields
- Exam ID
- Exam Name
- Subject
- Exam Date
- Duration

## UI Pages
- Add Exam Page
- Exam List Page
- Edit Exam Page

## OOP Concepts
- Encapsulation using Exam class

---

# 5.4 Question Management Module (FULL CRUD)

## Description
Manages examination questions.

## Features
- Add questions
- View questions
- Update questions
- Delete questions

## CRUD Operations

| Operation | Description |
|---|---|
| Create | Add question |
| Read | View questions |
| Update | Update question |
| Delete | Remove question |

## Question Fields
- Question ID
- Exam ID
- Question Text
- Option A
- Option B
- Option C
- Option D
- Correct Answer

## UI Pages
- Add Question Page
- Question List Page
- Edit Question Page

## OOP Concepts
- Encapsulation using Question class
- Inheritance using MCQQuestion class

---

# 5.5 Result Management Module (FULL CRUD)

## Description
Manages student examination results.

## Features
- Add result
- View results
- Update result
- Delete result

## CRUD Operations

| Operation | Description |
|---|---|
| Create | Add result |
| Read | View results |
| Update | Update marks |
| Delete | Remove result |

## Result Fields
- Result ID
- Student Name
- Exam Name
- Marks
- Grade

## UI Pages
- Add Result Page
- Result List Page
- Edit Result Page

## OOP Concepts
- Polymorphism for grading methods

---

# 6. Non-Functional Requirements

| Requirement | Description |
|---|---|
| Performance | Fast response time |
| Security | Login authentication |
| Usability | User-friendly interface |
| Reliability | Proper exception handling |
| Maintainability | Clean code structure |

---

# 7. System Architecture

## Frontend
React.js will be used for:
- Forms
- Tables
- Navigation
- API Integration

## Backend
Spring Boot will be used for:
- REST APIs
- CRUD Operations
- Business Logic
- H2 Database Connectivity

## Database
H2 Database will store:
- Student records
- Exam records
- Question records
- Result records
- Login details

---

# 8. Proposed Class Structure

```text
User

Student
Exam

Question
 └── MCQQuestion

Result