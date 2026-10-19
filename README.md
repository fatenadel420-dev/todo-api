# Todo API

A RESTful API built with Node.js, Express, SQLite, and Drizzle ORM.

## Technologies Used

- Node.js
- Express.js
- SQLite
- Drizzle ORM
- Drizzle Kit

## Features

- Get all todos
- Get a todo by ID
- Create a new todo
- Update a todo
- Toggle todo completion status
- Delete a todo

## Todo Fields

- id: Unique identifier
- title: Todo title
- body: Todo description
- created_at: Creation timestamp
- done: Completion status

## Installation

Install dependencies:

npm install

## Database Commands

Generate migrations:

npm run db:generate

Apply migrations:

npm run db:migrate

## Run the Server

npm start

The server runs on port 3000 by default.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /todos | Get all todos |
| GET | /todos/:id | Get a todo by ID |
| POST | /todos | Create a todo |
| PATCH | /todos/:id | Update a todo |
| PATCH | /todos/:id/toggle | Toggle todo status |
| DELETE | /todos/:id | Delete a todo |
