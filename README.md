# CampusConnect — Smart Campus Management System

A React + Tailwind + Firebase-ready sample project for CSE-2340 Software Development 1.

## Run locally (Demo Mode)

1. Install **Node.js LTS**.
2. Extract this ZIP.
3. Open the extracted `campusconnect` folder in VS Code.
4. Open Terminal in that folder and run:

```bash
npm install
npm run dev
```

5. Open the local URL printed by Vite (usually `http://localhost:5173`).
6. Sign in with any valid email and a password of at least 6 characters. Demo mode stores records in this browser's `localStorage`.

Example:
- Email: `student@campus.edu`
- Password: `campus123`

## Features included

- Three modules: Student records (starter data/dashboard), Notice Management, Event Management.
- React Router routes: `/login`, `/dashboard`, `/notices`, `/events`.
- Create, read, update and delete for notices and events.
- Student-owned course management: each student creates and manages their own courses. Admins can view all student courses.
- CGPA calculator using course credits and the configured 4.00 grade-point scale.
- Reusable components, props, state, effects, conditional rendering, lists, controlled forms and immutable updates.
- ShadCN-style reusable Button and Card components.
- Responsive navigation, semantic labels, focus styles and accessible feedback.
- Open-Meteo public API integration with loading and error handling.
- Demo persistence with localStorage so the app runs without Firebase credentials.
- Optional Firebase Email/Password Auth and Cloud Firestore mode.

## Enable Firebase (for shared/persistent cloud data)

1. Create a project at https://console.firebase.google.com/
2. Add a Web App in Project Settings.
3. Enable **Authentication → Sign-in method → Email/Password**.
4. Create **Cloud Firestore** database.
5. Copy `.env.example` to `.env` and fill in the Firebase Web App configuration values.
6. Restart the dev server.

Apply the security rules in `firestore.rules` (Firebase Console → Firestore Database → Rules). Follow `FIREBASE_SETUP.md` to configure the admin role and understand the data structure. Courses are stored under `users/{uid}/courses/{courseId}`, so students cannot read or modify another student's courses. Admins can view all courses. Never publish public read/write rules for real student data.

## Important project notes

- In Demo Mode, login is a local demonstration only; it is **not secure authentication**.
- Firebase mode uses Firebase Email/Password Authentication. Firestore security rules must be configured to enforce who can create, update, delete or read each record.
- The included Student Module is a starter record/dashboard module; expand it with a dedicated student CRUD page if your instructor expects full CRUD in all three modules.
- The current pages are deliberately limited to 3 main application pages plus login to match the 2–4 page/route proposal.
- Weather data is an optional enhancement. The core notice/event features do not depend on the API.
- Add your group members' names and responsibilities to your final proposal and README.

## Suggested Git workflow

```bash
git init
git add .
git commit -m "Initial CampusConnect project setup"
git add .
git commit -m "Add notice and event management modules"
git add .
git commit -m "Integrate Firebase and weather API"
```

Deploy the frontend with https://vercel.com/ after testing the production build:

```bash
npm run build
```
