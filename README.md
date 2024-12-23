# Task Management Application

## Overview

This document outlines the development of a full-stack application for Task Management system comprising of a React frontend and a Django backend. Essentially, the system should allow the users to perform CRUD operations on tasks with required additional functinalities including marking a task completed.

## Goal

To create a basic task management application with the following features:

### Backend:

- RESTful APIs to perform CRUD operations on "Task" entity
- Python Django based backend containing core business logic
- Basic Authentication & Authorisation for User Management using Django's built-in authentication system
- Support for Additional functionalities like ability to mark a task completed, with a completed task having a visibly different UI
- Robust system with proper validations and error handling
- Quality of output ensured with unit tests using Django's testing framework

### Frontend:

- ReactJS based frontend and user interface with core business logic powered by backend APIs
- Ability to list tasks, create new tasks, update existing tasks, and delete tasks
- UI should use proper state Management techniques to manage UI and keep it responsive
- Quality of output ensured with unit tests for frontend components using Jest or any other testing library

## System Architecture

**Architecture Choice: Monolithic**

Given the scope of this project, a monolithic approach is appropriate for faster development and ease of deployment. The architecture includes:

### Backend

- **Framework:** Django
- **APIs:** RESTful
- **Database:** SQLite (for simplicity; can scale to PostgreSQL for production)

- **Key Apps:**
  - **/apps/tasks:** App for handling task-related data and business logic.
  - **/apps/users:** App for user authentication and management.

### Frontend

- **Framework:** React Javascript
- **Styling:** CSS for UI responsiveness and distinct task statuses.
- **State Management:** React Context API for global state handling.

## High-Level Design (HLD)

TBA

## Models/Entity Schema

### Task:

- `id`: Primary Key
- `title`: String, max length 255
- `description`: Text, optional
- `priority`: Enum(String)
- `completed`: Boolean, default False
- `created_at`: Timestamp
- `updated_at`: Timestamp
- `deleted_at`: Timestamp, nullable
- `parent_task_id`: Foreign Key<Task>, nullable
- `assignee_id`: Foreign Key <User>, nullable
- `created_by`: Foreign Key <User>
- `updated_by`: Foreign Key <User>

### User:

- Django’s default User model is used for authentication and authorization.

## Setup & Startup Instructions

### Step 1: Clone the Repository

> ```bash
> git clone git@github.com:piyushgupta27/task-management-app.git
> cd task-management-app
> ```

### Step 2: Backend Setup

#### 1. Create a Virtual Environment

> ```bash
> cd backend
> python3 -m venv venv
> source venv/bin/activate
> ```

#### 2. Install Dependencies

> ```bash
> pip install -r requirements.txt
> ```

#### 3. Apply Migrations

> ```bash
> python manage.py makemigrations
> python manage.py migrate
> ```

#### 4. Create a Superuser (Important)

> ```bash
> python manage.py createsuperuser
> ```

#### 5. Run the Development Server

> ```bash
> python manage.py runserver
> ```

### Step 3: Frontend Setup

#### 1. Navigate to the frontend directory

> ```bash
> cd frontend
> ```

#### 2. Install Dependencies

> ```bash
> npm install
> ```

#### 3. Start the Development Server

> ```bash
> npm start
> ```

Visit http://localhost:3000 in your browser to see the React app.

## APIs Testing

Use the Postman Collection provided in the repository for API testing:

[Postman Collection](backend/Task%20Management%20App.postman_collection.json)

## APIs Documentation

### 1. Create a Task

`POST /tasks/`

**Request:**

> ```cURL
> curl -X POST http://localhost:8000/tasks/ \
> --header 'Authorization: ••••••' \
> -H "Content-Type: application/json" \
> -d '{
>   "title": "Finish Documentation",
>   "description": "Complete the task management API documentation"
> }'
> ```

**Response:**

> ```json
> {
>   "id": 1,
>   "title": "Initial Task",
>   "description": "Write a detailed description for the initial task.",
>   "completed": false,
>   "created_at": "2024-12-16T05:32:28.002166Z",
>   "updated_at": "2024-12-16T05:32:28.002224Z",
>   "created_by": 1,
>   "updated_by": 1
> }
> ```

### 2. Retrieve All Tasks

`GET /tasks/`

**Request:**

> ```cURL
> curl --location 'http://localhost:8000/api/v1/tasks/' \
> --header 'Authorization: ••••••' \
> --header 'Content-Type: application/json' \
> ```

**Response:**

> ```json
> [
>   {
>     "id": 1,
>     "title": "Initial Task",
>     "description": "Write a detailed description for the initial task.",
>     "completed": false,
>     "created_at": "2024-12-16T05:32:28.002166Z",
>     "updated_at": "2024-12-16T05:32:28.002224Z",
>     "created_by": 1,
>     "updated_by": 1
>   },
>   {
>     "id": 2,
>     "title": "Initial Task",
>     "description": "Write a detailed description for the initial task.",
>     "completed": false,
>     "created_at": "2024-12-16T05:33:26.409208Z",
>     "updated_at": "2024-12-16T05:33:26.409236Z",
>     "created_by": 1,
>     "updated_by": 1
>   },
>   {
>     "id": 3,
>     "title": "Initial Task",
>     "description": "Write a detailed description for the initial task.",
>     "completed": false,
>     "created_at": "2024-12-16T05:34:00.526801Z",
>     "updated_at": "2024-12-16T05:34:00.526838Z",
>     "created_by": 1,
>     "updated_by": 1
>   }
> ]
> ```

### 3. Retrieve a Single Task

`GET /tasks/{id}/`

**Request:**

> ```cURL
> curl --location 'http://localhost:8000/api/v1/tasks/1/' \
> --header 'Authorization: ••••••' \
> -H "Content-Type: application/json"
> ```

**Response:**

> ```json
> {
>   "id": 1,
>   "title": "Initial Task",
>   "description": "Write a detailed description for the initial task.",
>   "completed": false,
>   "created_at": "2024-12-16T05:32:28.002166Z",
>   "updated_at": "2024-12-16T05:32:28.002224Z",
>   "created_by": 1,
>   "updated_by": 1
> }
> ```

### 4. Update a Task

`PUT /tasks/{id}/`

**Request:**

> ```cURL
> curl --location --request PATCH 'http://localhost:8000/api/v1/tasks/5/' \
> --header 'Content-Type: application/json' \
> --header 'Authorization: ••••••' \
> --data '{
>   "description": "This is updated detailed description for the new task to test mark-completed API."
>   }'
> ```

**Response:**

> ```json
> {
>   "id": 5,
>   "title": "New Task",
>   "description": "This is updated detailed description for the new task to test mark-completed API.",
>   "completed": true,
>   "created_at": "2024-12-21T12:13:12.271280Z",
>   "updated_at": "2024-12-23T03:23:49.033556Z",
>   "created_by": 2,
>   "updated_by": 2
> }
> ```

### 5. Mark a Task Completed

`PUT /tasks/{id}/mark-completed`

**Request:**

> ```cURL
> curl --location --request PATCH 'http://localhost:8000/api/v1/tasks/5/mark-completed' \
> --header 'Content-Type: application/json' \
> --header 'Authorization: ••••••' \
> ```

**Response:**

> ```json
> {
>   "id": 5,
>   "title": "New Task",
>   "description": "Detailed description for the new task to test mark-completed API.",
>   "completed": true,
>   "created_at": "2024-12-21T12:13:12.271280Z",
>   "updated_at": "2024-12-23T03:23:49.033556Z",
>   "created_by": 2,
>   "updated_by": 2
> }
> ```

### 6. Delete a Task

`DELETE /tasks/{id}/`

**Request:**

> ```cURL
> curl -X DELETE http://localhost:8000/tasks/1/ \
> -H "Content-Type: application/json"
> ```

**Response:**

> ```json
> {
>   "status": "success",
>   "message": "Task deleted successfully."
> }
> ```

## Testing

### Backend Testing

- Use Django’s built-in test suite to run tests.
- Run the following command to execute tests:

> ```bash
> cd backend
> pytest --cov=tasks --cov-report=html
> ```

### Frontend Testing

_TBA_

## Next Steps

1. Write unit tests for the frontend components using Jest and React Testing Library.
2. Deploy the application to production (optional).
3. Integrate task categories, notifications, or advanced filtering as future enhancements.
