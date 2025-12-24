# TaskMaster

A premium, minimalist MERN stack task management application designed to help you organize your life with style and efficiency.

---

## Overview

TaskMaster is a modern, feature-rich task management solution built with the MERN (MongoDB, Express, React, Node.js) stack. It combines robust backend functionality with a sleek, glassmorphism-inspired frontend to provide a smooth and intuitive user experience.

Whether you need to track daily to-dos, manage work projects, or analyze your productivity, TaskMaster is designed to support you efficiently.

---

## Features

### Secure Authentication

* Full user registration and login system using JSON Web Tokens (JWT)

### Smart Task Management

* Create, read, update, and delete tasks seamlessly

### Organization

* Priority levels: High, Medium, Low with visual indicators
* Categories such as Work and Personal
* Multiple tags for granular task filtering
* Due dates to ensure deadlines are never missed

### Interactive Calendar

* Monthly calendar view to visualize task deadlines

### Momentum Mode

* Distraction-free card-based task interaction
* Swipe right to focus, left to snooze, and up to complete tasks

### Analytics Dashboard

* Real-time charts showing task completion rates
* Priority-based task distribution insights

### Advanced Filtering

* Filter tasks by status: All, Pending, Completed

### Premium UI and UX

* Fully responsive design for desktop and mobile
* Smooth animations using Framer Motion
* Modern glassmorphism aesthetic using Tailwind CSS

---

## Technology Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Framer Motion
* Recharts
* React Router DOM
* Date-fns

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose ODM
* JSON Web Token (JWT)
* Bcryptjs

---

## Installation and Setup

### Prerequisites

* Node.js v14 or higher
* MongoDB (local instance or MongoDB Atlas)

---

### Backend Setup

Navigate to the server directory and install dependencies:

```bash
cd server
npm install
```

Create a `.env` file inside the server directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskmaster
JWT_SECRET=your_super_secret_key
```

Start the backend server:

```bash
# Development mode
npm run dev

# Or standard start
node index.js
```

The server will run on [http://localhost:5000](http://localhost:5000)

---

### Frontend Setup

Navigate to the client directory and install dependencies:

```bash
cd client
npm install
```

Start the frontend development server:

```bash
npm run dev
```

The application will typically run on [http://localhost:5173](http://localhost:5173) or [http://localhost:5174](http://localhost:5174)

---

## Environment Variables

| Variable   | Description               | Default                              |
| ---------- | ------------------------- | ------------------------------------ |
| PORT       | Server port               | 5000                                 |
| MONGO_URI  | MongoDB connection string | mongodb://localhost:27017/taskmaster |
| JWT_SECRET | JWT signing secret        | Set your own                         |

---

## Contributing

Contributions are welcome. Please fork the repository and submit a pull request with your changes.

---

## License

This project is open source and available under the MIT License.
