
# CampusConnect

CampusConnect is a university-focused web application designed to help students manage their academic activities in one place.

## Features

- User Authentication
- Student Dashboard
- Course Management
- CGPA Calculation
- Notice Board
- Event Information
- Admin Dashboard
- Admin Grade Management

## Technologies Used

- React
- Vite
- Tailwind CSS
- Firebase Authentication
- Cloud Firestore
- JavaScript

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/azmain-abrar/campus.git
```

### 2. Navigate to the Project Folder

```bash
cd campus
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Firebase

Create a `.env` file in the root directory and add your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Replace the placeholder values with your Firebase project configuration.

### 5. Run the Development Server

```bash
npm run dev
```

Open the local URL provided by Vite in your browser.

## Firebase Services

CampusConnect uses:

- Firebase Authentication for user authentication.
- Cloud Firestore for storing and managing application data.

## Environment Variables

The `.env` file contains local Firebase configuration and should not be uploaded to GitHub.

Use `.env.example` as a template for configuring the project.

## Author

**Mohammod Azmain Abrar**

GitHub: [azmain-abrar](https://github.com/azmain-abrar)
