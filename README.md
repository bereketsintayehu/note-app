# Note Taking App

The Note Taking App is a web application that allows users to create, update, and delete notes. It consists of a frontend and backend implementation.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Users can register, log in, and log out.
- **Note Management**: Users can create new notes, update existing notes, and delete notes.
- **Markdown Support**: Notes can be written in markdown format for easy formatting and styling.
- **User Profile**: Users can view their profile information.

## Technologies

The project uses the following technologies:

- **Frontend**:
  - React: A JavaScript library for building user interfaces.
  - Redux: A predictable state container for managing application state.
  - Axios: A promise-based HTTP client for making API requests.
  - React Router: A library for routing in React applications.
  - Material-UI: A popular React UI framework for building responsive web applications.
- **Backend**:
  - Node.js: A JavaScript runtime environment for running server-side applications.
  - Express.js: A web application framework for building RESTful APIs.
  - MongoDB: A NoSQL database for storing user and note data.
  - Mongoose: An Object Data Modeling (ODM) library for MongoDB.

## Installation

1. Clone the repository: `git clone https://github.com/bereketsintayehu/note-app`
2. Install the dependencies:
   - For the backend, run `npm install` 
   - For the frontend, navigate to the `frontend` directory and run `npm install`

## Usage

1. Start the backend server:
   - Run `npm start`
2. Start the frontend application:
   - Navigate to the `frontend` directory
   - Run `npm start`

## API Endpoints

The following API endpoints are available:

- **POST /api/users**: Register a new user.
- **POST /api/users/login**: Authenticate a user and generate an access token.
- **GET /api/users/me**: Get the user's profile information.
- **GET /api/notes**: Get all notes for the authenticated user.
- **POST /api/notes**: Create a new note for the authenticated user.
- **PUT /api/notes/:id**: Update a note with the specified ID.
- **DELETE /api/notes/:id**: Delete a note with the specified ID.
## License

This project is licensed under the MIT License.
