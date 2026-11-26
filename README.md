# Books REST API

A simple REST API for managing a list of books, built with Node.js and Express. Data is stored in memory, so it resets every time the server restarts.

## Features

- List all books and fetch a single book by ID
- Create, update, and delete books
- Input validation with clear error messages
- Proper HTTP status codes (200, 201, 204, 400, 404)

## Tech Stack

- Node.js
- Express

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm

### Installation

```bash
git clone https://github.com/rizkilabs/books-rest-api.git
cd books-rest-api
npm install
```

### Running the Server

```bash
# Production mode
npm start

# Development mode (auto-restart on file changes)
npm run dev
```

The server runs on `http://localhost:3000` by default. Set the `PORT` environment variable to use a different port.

## Project Structure

```
src/
├── data/
│   └── books.js      # In-memory book data
├── routes/
│   └── books.js      # Book routes and validation
└── index.js          # App entry point
```

## API Endpoints

| Method | Endpoint     | Description             |
| ------ | ------------ | ----------------------- |
| GET    | `/books`     | Get all books           |
| GET    | `/books/:id` | Get a book by ID        |
| POST   | `/books`     | Create a new book       |
| PUT    | `/books/:id` | Update an existing book |
| DELETE | `/books/:id` | Delete a book           |

### Book Object

```json
{
  "id": 1,
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "year": 2008
}
```

### GET /books

Returns all books.

**Response:** `200 OK`

```json
[
  {
    "id": 1,
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "year": 2008
  }
]
```

### GET /books/:id

Returns a single book.

**Response:** `200 OK`

```json
{
  "id": 1,
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "year": 2008
}
```

**Error:** `404 Not Found`

```json
{ "error": "Book not found" }
```

### POST /books

Creates a new book. All fields are required.

**Request body:**

```json
{
  "title": "Refactoring",
  "author": "Martin Fowler",
  "year": 1999
}
```

**Response:** `201 Created`

```json
{
  "id": 4,
  "title": "Refactoring",
  "author": "Martin Fowler",
  "year": 1999
}
```

**Error:** `400 Bad Request`

```json
{
  "errors": [
    "title is required and must be a non-empty string",
    "author is required and must be a non-empty string",
    "year is required and must be an integer"
  ]
}
```

### PUT /books/:id

Replaces an existing book. All fields are required. The book ID stays the same.

**Request body:**

```json
{
  "title": "Clean Code (2nd Edition)",
  "author": "Robert C. Martin",
  "year": 2024
}
```

**Response:** `200 OK`

```json
{
  "id": 1,
  "title": "Clean Code (2nd Edition)",
  "author": "Robert C. Martin",
  "year": 2024
}
```

**Errors:** `404 Not Found` if the book does not exist, `400 Bad Request` if validation fails.

### DELETE /books/:id

Deletes a book.

**Response:** `204 No Content` (empty body)

**Error:** `404 Not Found`

```json
{ "error": "Book not found" }
```

## Example Usage

```bash
# Get all books
curl http://localhost:3000/books

# Create a book
curl -X POST http://localhost:3000/books \
  -H "Content-Type: application/json" \
  -d '{"title":"Refactoring","author":"Martin Fowler","year":1999}'

# Update a book
curl -X PUT http://localhost:3000/books/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Clean Code","author":"Robert C. Martin","year":2008}'

# Delete a book
curl -X DELETE http://localhost:3000/books/1
```

## Possible Improvements

- Persist data with a database (PostgreSQL, MongoDB, etc.)
- Add pagination and search for `GET /books`
- Add `PATCH` for partial updates
- Add automated tests
- Add authentication

## License

MIT
