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

- id: Primary Key
- title: String, max length 255
- description: Text, optional
- priority: Enum(String)
- completed: Boolean, default False
- created_at: Timestamp
- updated_at: Timestamp
- deleted_at: Timestamp, nullable
- parent_task_id: Foreign Key<Task>, nullable
- assignee_id: Foreign Key <User>, nullable
- created_by: Foreign Key <User>
- updated_by: Foreign Key <User>

### User:

- Django’s default User model is used for authentication and authorization.

## APIs Documentation

### 1. Create a Task

`POST /tasks/`

**Request:**

> ```cURL
> curl -X POST http://localhost:8000/tasks/ \
> -H "Content-Type: application/json" \
> -d '{
>   "title": "Finish Documentation",
>   "description": "Complete the task management API documentation",
>   "priority": "High",
>   "parent_task_id": null,
>   "assignee_id": 2,
>   "created_by": 1,
>   "updated_by": 1
> }'
> ```

**Response:**

> ```json
> {
>   "status": "success",
>   "data": {
>     "id": 1,
>     "title": "Finish Documentation",
>     "description": "Complete the task management API documentation",
>     "priority": "High",
>     "completed": false,
>     "created_at": "2024-12-12T12:00:00Z",
>     "updated_at": "2024-12-12T12:00:00Z",
>     "deleted_at": null,
>     "parent_task_id": null,
>     "assignee_id": 2,
>     "created_by": 1,
>     "updated_by": 1
>   }
> }
> ```

### 2. Retrieve All Tasks

`GET /tasks/`

**Request:**

> ```cURL
> curl -X GET http://localhost:8000/tasks/ \
> -H "Content-Type: application/json"
> ```

**Response:**

> ```json
> {
>   "status": "success",
>   "data": [
>     {
>       "id": 1,
>       "title": "Finish Documentation",
>       "description": "Complete the task management API documentation",
>       "priority": "High",
>       "completed": false,
>       "created_at": "2024-12-12T12:00:00Z",
>       "updated_at": "2024-12-12T12:00:00Z",
>       "deleted_at": null,
>       "parent_task_id": null,
>       "assignee_id": 2,
>       "created_by": 1,
>       "updated_by": 1
>     },
>     {
>       "id": 2,
>       "title": "Code Review",
>       "description": null,
>       "priority": "Medium",
>       "completed": false,
>       "created_at": "2024-12-10T08:30:00Z",
>       "updated_at": "2024-12-10T08:30:00Z",
>       "deleted_at": null,
>       "parent_task_id": null,
>       "assignee_id": 3,
>       "created_by": 1,
>       "updated_by": 2
>     }
>   ]
> }
> ```

### 3. Retrieve a Single Task

`GET /tasks/{id}/`

**Request:**

> ```cURL
> curl -X GET http://localhost:8000/tasks/1/ \
> -H "Content-Type: application/json"
> ```

**Response:**

> ```json
> {
>   "status": "success",
>   "data": {
>     "id": 1,
>     "title": "Finish Documentation",
>     "description": "Complete the task management API documentation",
>     "priority": "High",
>     "completed": false,
>     "created_at": "2024-12-12T12:00:00Z",
>     "updated_at": "2024-12-12T12:00:00Z",
>     "deleted_at": null,
>     "parent_task_id": null,
>     "assignee_id": 2,
>     "created_by": 1,
>     "updated_by": 1
>   }
> }
> ```

### 4. Update a Task

`PUT /tasks/{id}/`

**Request:**

> ```cURL
> curl -X PUT http://localhost:8000/tasks/1/ \
> -H "Content-Type: application/json" \
> -d '{
>   "title": "Update Documentation",
>   "priority": "Medium",
>   "completed": true,
>   "updated_by": 2
> }'
> ```

**Response:**

> ```json
> {
>   "status": "success",
>   "data": {
>     "id": 1,
>     "title": "Update Documentation",
>     "description": "Complete the task management API documentation",
>     "priority": "Medium",
>     "completed": true,
>     "created_at": "2024-12-12T12:00:00Z",
>     "updated_at": "2024-12-12T13:30:00Z",
>     "deleted_at": null,
>     "parent_task_id": null,
>     "assignee_id": 2,
>     "created_by": 1,
>     "updated_by": 2
>   }
> }
> ```

### 5. Delete a Task

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

## Next Steps

TBA
