# Gemini 2.0 MERN Chatbot

## Overview

The Gemini 2.0 MERN Chatbot is a full-stack application that enables users to interact with an AI-powered chatbot using Google’s Gemini 2.0 model. Users can sign up or log in using Google OAuth, and all authentication is secured using JWT tokens. The app supports secure chat sessions, stores user profiles and chat history in MongoDB, and includes robust error handling and route protection.

## Features

- Google OAuth 2.0 authentication
- JWT-based session management
- AI chat powered by Gemini 2.0 (Google Generative AI API)
- User profile and chat history management
- Secure, RESTful API with Express.js
- React.js frontend for seamless chat UI
- Protected routes for authenticated users
- Modern error handling and validation

## Technologies Used

- Node.js
- Express.js
- MongoDB (with Mongoose)
- React.js
- Google Gemini 2.0 API
- Google OAuth 2.0 (Passport.js or NextAuth.js)
- JSON Web Token (JWT)
- dotenv
- Axios

## Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v14.x or later)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- [Git](https://git-scm.com/)
- [Google Cloud account](https://cloud.google.com/) with Gemini API enabled

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/gemini-mern-chatbot.git
cd gemini-mern-chatbot

**## Technologies Used**
cd backend
npm install

Create a .env file in the backend folder with the following:
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GEMINI_API_KEY=your_gemini_api_key


Start the backend server:
npm run dev

Frontend Setup
cd ../frontend
npm install
npm start

Usage
Sign up or log in using your Google account.

Start chatting with the Gemini 2.0 AI-powered chatbot.

All chat sessions and user profiles are securely managed.

Security
Never commit your .env files or credentials to version control.

Use environment variables for all API keys and secrets.

JWT is used for authenticating API routes.

Google OAuth ensures secure user login.

License
MIT

Author
Jenish Katuwal

---

Let me know if you want to add **API routes, contribution guidelines, screenshots, or any extra features**!
contact me jenishkatuwal7@gmail.com
