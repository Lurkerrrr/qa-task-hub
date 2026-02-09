# QA Task Manager

**QA Task Manager** is a full-stack web application designed for tracking software quality assurance metrics, managing bug lifecycles, and visualizing project health data. The system utilizes a React-based frontend for the user interface and a Node.js/Express backend with SQLite for persistent data storage.

---

## Project Overview

This application serves as a centralized hub for QA engineers to log defects, monitor testing progress, and analyze critical quality indicators such as defect density and fix rates. Unlike static dashboards, this project implements a complete client-server architecture, allowing for Create, Read, Update, and Delete (CRUD) operations on a persistent database.

---

## Technical Architecture

The project follows a standard MVC (Model-View-Controller) pattern adapted for a modern JavaScript stack.

### 1. Frontend (Client)
* **Framework:** React.js (v18)
* **Routing:** React Router DOM (v6) for client-side navigation.
* **State Management:** React Hooks (useState, useEffect) for local state and data fetching.
* **Visualization:** Chart.js and React-Chartjs-2 for rendering statistical graphs.
* **UI/UX:** Tailwind CSS for styling and Framer Motion for interface transitions.

### 2. Backend (Server)
* **Runtime:** Node.js
* **Framework:** Express.js for handling HTTP requests and routing.
* **Database:** SQLite (file-based relational database).
* **Middleware:** CORS (Cross-Origin Resource Sharing) enabled for local development.

### 3. DevOps & Tooling
* **Version Control:** Git
* **Process Management:** Concurrently (executes client and server simultaneously).

---

## API Documentation

The backend exposes a RESTful API running on port `5000`.

| Method | Endpoint       | Description                                      | Payload Example |
|--------|----------------|--------------------------------------------------|-----------------|
| **GET**| `/bugs`        | Retrieves the full list of bug reports.          | N/A             |
| **POST**| `/bugs`       | Creates a new bug report in the database.        | `{ "title": "...", "priority": "High" }` |
| **PUT** | `/bugs/:id`    | Updates the status or details of a specific bug. | `{ "status": "Done" }` |
| **DELETE**| `/bugs/:id` | Permanently removes a bug report.                | N/A             |

---

## Key Features

* **Persistent Data Storage:** All defect data is stored in a local SQLite database (`backend/database.sqlite`), ensuring data persistence across server restarts.
* **Real-time Analytics:** Dashboard calculates Success Rate and Critical Density automatically based on active data.
* **Bug Tracker:** Fully functional interface for creating, filtering, and managing software issues.
* **Internationalization (i18n):** Built-in support for multiple languages (English, Polish, Ukrainian, Russian).
* **Responsive Layout:** Adaptive design supporting various screen sizes.

---

## Installation and Setup

**Prerequisites:** Node.js (v16+) and npm.

1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/YOUR_USERNAME/qa-task-hub.git](https://github.com/YOUR_USERNAME/qa-task-hub.git)
    cd qa-task-hub
    ```

2.  **Install Dependencies**
    ```bash
    # Install Root (Frontend) dependencies
    npm install

    # Install Backend dependencies
    cd backend
    npm install
    cd ..
    ```

3.  **Run the Application**
    ```bash
    npm run dev
    ```
    This command executes `concurrently`, launching both the Backend Server (`http://localhost:5000`) and Frontend Client (`http://localhost:3000`).