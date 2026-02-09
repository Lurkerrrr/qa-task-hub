QA Task Manager
QA Task Manager is a full-stack web application designed for tracking software quality assurance metrics, managing bug lifecycles, and visualizing project health data. The system utilizes a React-based frontend for the user interface and a Node.js/Express backend with SQLite for persistent data storage.

Project Overview
This application serves as a centralized hub for QA engineers to log defects, monitor testing progress, and analyze critical quality indicators such as defect density and fix rates. Unlike static dashboards, this project implements a complete client-server architecture, allowing for Create, Read, Update, and Delete (CRUD) operations on a persistent database.

Technical Architecture
The project follows a standard MVC (Model-View-Controller) pattern adapted for a modern JavaScript stack:

Frontend (Client): A Single Page Application (SPA) built with React.js. It handles state management, routing, and UI rendering. It communicates with the backend via asynchronous HTTP requests (Fetch API).

Backend (Server): A RESTful API built with Node.js and Express. It processes client requests, applies business logic, and interacts with the database.

Database: SQLite. A server-less, file-based relational database engine used for storing bug reports and statuses. This ensures data persistence without requiring external database server configuration.

Technology Stack
Frontend
Framework: React.js (v18)

Routing: React Router DOM (v6) for client-side navigation.

Styling: Tailwind CSS for utility-first, responsive design.

Visualization: Chart.js and React-Chartjs-2 for rendering statistical graphs.

Animation: Framer Motion for UI transitions.

State Management: React Hooks (useState, useEffect, useContext).

Backend
Runtime: Node.js

Framework: Express.js for handling HTTP requests and routing.

Database Driver: sqlite3 (verbose mode enabled).

Middleware: CORS (Cross-Origin Resource Sharing) to allow communication between the frontend (port 3000) and backend (port 5000).

DevOps & Tooling
Version Control: Git

Package Manager: npm

Process Management: Concurrently (allows running both client and server via a single command).

API Documentation
The backend exposes the following REST endpoints at http://localhost:5000:

GET /bugs Retrieves the list of all bug reports stored in the database.

POST /bugs Creates a new bug report. Accepts a JSON payload containing title, priority, severity, assignee, description, and steps.

PUT /bugs/:id Updates an existing bug report (e.g., changing status from 'Open' to 'Done'). Accepts JSON payload.

DELETE /bugs/:id Permanently removes a bug report from the database based on its unique ID.

Directory Structure
backend/: Contains server-side logic, API route definitions, and the SQLite database file.

src/: Contains the React source code.

components/: Reusable UI components (Dashboard, BugTracker, Header).

locales/: Translation files for internationalization.

public/: Static assets and entry HTML file.

Installation and Setup
Prerequisites: Node.js (v16 or higher) and npm must be installed on your machine.

1. Clone the Repository
Bash
git clone https://github.com/YOUR_USERNAME/qa-task-hub.git
cd qa-task-hub
2. Install Dependencies
This project requires dependencies for both the root (frontend) and the backend directory.

Root dependencies:

Bash
npm install
Backend dependencies:

Bash
cd backend
npm install
cd ..
3. Running the Application
The project is configured to run both the frontend and backend servers simultaneously using a single command.

Development Mode:

Bash
npm run dev
This command executes concurrently, which starts:

The Node.js backend server on port 5000.

The React development server on port 3000.

Access the application by navigating to http://localhost:3000 in your web browser.

Features
Persistent Bug Tracking: Issues created in the interface are saved to backend/database.sqlite and persist after server restarts.

Dashboard Analytics: Automated calculation of project success rates and critical bug density.

Search and Filtering: Real-time filtering of bug lists by title or keyword.

Internationalization: Built-in support for multiple languages (English, Polish, Ukrainian, Russian).

Responsive Design: Fully adaptive layout for desktop and mobile interfaces.