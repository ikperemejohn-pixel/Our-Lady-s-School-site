# Our Lady's Catholic Secondary School Portal

This repository contains the **School Management System** for OLCSS Ilorin.

## 📂 Structure
```
olcss-school-portal/
│── backend/   # Django REST Framework backend
│── frontend/  # React frontend with dashboards
│── README.md  # Setup + deployment guide
```

---

## 🚀 Deployment Guide

### 1. Backend (Django + DRF)
- Requirements: Python 3.10+, PostgreSQL
- Copy `.env.example` → `.env` and update DB + email + Paystack details
- Install dependencies:
  ```bash
  cd backend
  pip install -r requirements.txt
  python manage.py migrate
  python manage.py createsuperuser
  python manage.py runserver
  ```
- Deploy on **Railway** (recommended). Add environment variables.

### 2. Frontend (React + Tailwind)
- Requirements: Node.js 18+
- Install dependencies:
  ```bash
  cd frontend
  npm install
  npm run dev
  ```
- Update `.env.local` with API URL of backend.
- Deploy on **Vercel** (recommended). Select `frontend/` as root folder.

### 3. Default Login
- Admin Email: `ikperemejohn@gmail.com`
- Admin Password: `Admin@123`

### 4. Features
✅ Student Dashboard (results, exams)  
✅ Teacher Dashboard (courses, classes, results upload)  
✅ Parent Dashboard (child results & info)  
✅ Admin Dashboard (full control)  
✅ PDF Report Cards with QR Code  
✅ A–F Grading System (JSS1–SS3, SS1–SS3)  

---

## 📞 Contact
- Phone: 07039841786  
- Email: ourladyscss.kulendeilorin@gmail.com  
- Domain: `olcssilorin.com`
