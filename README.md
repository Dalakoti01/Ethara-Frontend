# Team Task Manager – MERN Stack

A full-stack Team Task Manager application built using the MERN stack.
The platform allows teams to create projects, assign tasks, manage members, and track task/project progress with role-based access control.

---

# Live Demo

Frontend URL:
https://ethara-frontend-production-a799.up.railway.app/

Backend URL:
(https://ethara-backend-production-e53e.up.railway.app/)

Demo Video:
https://drive.google.com/file/d/1CJf_X48UVtMENRpHArRe8j9nenC-FE5c/view

---

# Tech Stack

## Frontend

* React.js
* Redux Toolkit
* Redux Persist
* Tailwind CSS
* Axios
* React Router DOM
* Lucide React Icons

## Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* bcryptjs

## Deployment

* Railway

---

# Features

## Authentication

* User Signup
* User Login
* JWT-based Authentication
* Protected Routes

## Role-Based Access Control

### Admin

* Create Projects
* Update/Delete Projects
* Create Tasks
* Update/Delete Tasks
* Assign Members to Projects & Tasks
* View Dashboard Analytics

### Member

* View Assigned Projects
* View Assigned Tasks
* Update Task Status
* Update Project Status

---

# Dashboard Features

* Total Projects
* Completed Tasks
* Pending Tasks
* Overdue Tasks
* Recent Tasks

---

# Project Features

* Create Project
* Assign Team Members
* Update Project
* Delete Project
* Update Project Status

---

# Task Features

* Create Task
* Assign Members
* Update Task
* Delete Task
* Update Task Status

---

# Team Management

* View Team Members
* Assign Members to Projects & Tasks

---

# Test Accounts

## Admin Account

Email:
[dalakotiKaran11@gmail.com](mailto:dalakotiKaran11@gmail.com)

Password:
password

---

## Member Account 1

Email:
[tanmay123@gmail.com](mailto:tanmay123@gmail.com)

Password:
password

---

## Member Account 2

Email:
[vijay123@gmail.com](mailto:vijay123@gmail.com)

Password:
password

---

# Installation & Setup

## Clone Repository

```bash
git clone <your-github-repo-url>
```

---

# Backend Setup

```bash
cd backend
npm install
npm run dev
```

Create `.env` file inside backend:

```env
MONGO_URI="mongodb+srv://dalakotikaran11_db_user:3SewLAArrDb0m3PD@cluster0.ugbi7w9.mongodb.net/?appName=Cluster0"
PORT=8000
SECRET_KEY="secretkey123"
MONGO_USERNAME="dalakotikaran11_db_user"
MONGO_PASSWORD="3SewLAArrDb0m3PD"
FRONTEND_URL="https://ethara-frontend-production-a799.up.railway.app/"
```

---

# Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Create `.env` file inside frontend:

```env
VITE_BACKEND_URI=https://ethara-backend-production-e53e.up.railway.app/
```

---

# Folder Structure

```bash
root
│
├── frontend
│
└── backend
```

---

# Deployment

The application is deployed on Railway.

---

# Author

Karan Dalakoti
