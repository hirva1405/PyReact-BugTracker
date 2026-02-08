🛡️ BugTracker PRO: Enterprise Issue Management System
BugTracker PRO is a high-performance, full-stack application engineered to streamline the software development lifecycle. By integrating a FastAPI (Python) asynchronous backend with a React (JavaScript) state-driven frontend, it delivers a seamless experience for tracking, analyzing, and resolving software defects.

📑 Table of Contents
Core Philosophy

Technical Architecture

Key Modules

Tech Stack

API Documentation

Folder Structure

Getting Started

Deployment Roadmap

🎯 Core Philosophy
Standard to-do apps fail because they lack context. BugTracker PRO is built on the principle of "Project Intelligence"—providing developers not just a list of tasks, but a data-driven overview of project health, priority distribution, and historical trends.

🏗️ Technical Architecture
The application utilizes a Decoupled Microservices Architecture, ensuring high availability and independent scalability of the frontend and backend layers.

Communication Flow:
Client Layer: React handles the UI state and local filtering logic.

API Layer: FastAPI manages asynchronous requests and business logic.

Data Layer: MongoDB Atlas provides a flexible NoSQL schema for rapid data iteration.

✨ Key Modules
1. ⚡ Active Sprints Dashboard
The central command center for developers. Features include:

Real-time CRUD: Create, update, and delete bug tickets instantly.

Priority Engine: Visual color-coding (Red/Amber/Green) for urgent issues.

Status Workflow: Transition bugs from Started → In Process → Completed.

2. 📊 Project Intelligence (Analytics)
A strategic view for project managers to monitor team velocity:

Live Stats: Automatic calculation of fixed vs. pending issues.

Archive Logic: Automatically moves completed bugs to the "Intelligence Vault."

3. 🔍 Dual-Layer Search
Integrated real-time search bars using client-side computed properties, allowing for zero-latency filtering across hundreds of tasks.

🛠️ Tech Stack
Frontend
Library: React.js (Hooks-based)

Styling: Tailwind CSS (Mobile-responsive, Dark theme)

Routing: React Router DOM

Icons: Lucide-React / Emoji-standard

Backend
Framework: FastAPI (Python 3.10+)

Server: Uvicorn (ASGI)

Database: MongoDB (via Motor/Pymongo)

Validation: Pydantic models

📂 Folder Structure
Plaintext
BugTracker/
├── backend/
│   ├── app/
│   │   ├── main.py          # FastAPI Entry Point
│   │   ├── models.py        # Pydantic Schemas
│   │   └── database.py      # MongoDB Configuration
│   ├── requirements.txt     # Python Dependencies
│   └── .env                 # Environment Variables
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   └── Dashboard.js # Main UI Logic
    │   ├── services/
    │   │   └── api.js       # Axios Configuration
    │   └── App.js           # Root Component
    ├── tailwind.config.js
    └── package.json
🚥 API Documentation
The backend provides automated interactive documentation via Swagger UI.

GET /api/issues/{user_id}: Fetch all issues for a specific user.

POST /api/issues: Create a new bug ticket.

PUT /api/issues/{id}: Update bug status or priority.

DELETE /api/issues/{id}: Remove a ticket from the system.

🚀 Getting Started
Prerequisites
Python 3.8+

Node.js 16+

MongoDB Atlas Account

Installation
Clone the repo:

Bash
git clone https://github.com/hirva1405/BugTracker-Pro.git
Setup Backend:

Bash
cd backend
pip install -r requirements.txt
python -m uvicorn app.main:app --reload
Setup Frontend:

Bash
cd frontend
npm install
npm start

🌎 Deployment Roadmap
Backend: Render 
Link :- https://bugtracker-backend-lvau.onrender.com

Frontend: Render 
Link:- https://bugtracker-frontend-qg2d.onrender.com

Database: Global cluster on MongoDB Atlas.

🤝 Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create.

Fork the Project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request
