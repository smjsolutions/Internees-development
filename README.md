# Salon Managemnt System - Tailwind & Node.js Application

This project is a full-stack web application with:

- Frontend: React + Tailwind CSS
- Backend: Node.js + Express.js
- Database: MongoDB 
- Version Control: Git + GitHub

It demonstrates building APIs, handling CRUD operations, and connecting frontend with backend.
## Prerequisites

Before you start, make sure you have installed the following:

- Node.js (v18 or above) → [Download Node.js](https://nodejs.org/)
- npm (comes with Node.js)
- Git → [Download Git](https://git-scm.com/)
- MongoDB (if using local database) → [Download MongoDB](https://www.mongodb.com/)
- Postman (optional, for testing APIs)
## Backend Setup

1. Open terminal in the backend folder:

```bash
cd backend
npm init -y
npm install express mongoose cors dotenv
Create server.js (or index.js) file:
Create .env file in backend folder:
Run the server:

node server.js
# or for automatic restart:
npm install -g nodemon
nodemon server.js
Test in browser or Postman:

http://localhost:5000/
## Frontend Setup

1. Open terminal in frontend folder:

```bash
cd frontend
npm create vite@latest .
# Choose React + JavaScript
npm install
Install Tailwind CSS:

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
Configure tailwind.config.js:
Add Tailwind to src/index.css:
Run the frontend:

npm run dev
Git & GitHub Commands
## Git & GitHub

1. Initialize git (if not done):

```bash
git init


Check git status:

git status


Add files:

git add .


Commit changes:

git commit -m "Initial commit"


Connect to GitHub remote (replace URL with your repo):

git remote add origin https://github.com/YourUsername/RepoName.git


Pull remote changes (if repo already exists on GitHub):

git pull origin master --allow-unrelated-histories


Push changes to GitHub:

git push origin master


If non-fast-forward error occurs:

git push origin master --force