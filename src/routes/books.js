const express = require("express");
const books = require("../data/books");

const router = express.Router();

// Counter for generating unique IDs (safer than books.length + 1 once we support DELETE)
let nextId = books.length + 1;

// Validate book fields and return a list of error messages (empty if valid)
function validateBook({ title, author, year }) {
  const errors = [];

  if (typeof title !== "string" || title.trim() === "") {
    errors.push("title is required and must be a non-empty string");
  }

  if (typeof author !== "string" || author.trim() === "") {
    errors.push("author is required and must be a non-empty string");
  }

  if (!Number.isInteger(year)) {
    errors.push("year is required and must be an integer");
  }

  return errors;
}

// GET /books - Return all books
router.get("/", (req, res) => {
  res.status(200).json(books);
});

// GET /books/:id - Return a single book by its ID
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const book = books.find((b) => b.id === id);

  // Return 404 if the book does not exist
  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }

  res.status(200).json(book);
});

// POST /books - Create a new book
router.post("/", (req, res) => {
  const errors = validateBook(req.body);

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const { title, author, year } = req.body;

  const newBook = {
    id: nextId++,
    title: title.trim(),
    author: author.trim(),
    year,
  };

  books.push(newBook);

  // 201 Created with the new resource in the response body
  res.status(201).json(newBook);
});

// PUT /books/:id - Replace an existing book
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = books.findIndex((b) => b.id === id);

  // Return 404 if the book does not exist
  if (index === -1) {
    return res.status(404).json({ error: "Book not found" });
  }

  const errors = validateBook(req.body);

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const { title, author, year } = req.body;

  // Keep the original ID, replace everything else
  books[index] = {
    id,
    title: title.trim(),
    author: author.trim(),
    year,
  };

  res.status(200).json(books[index]);
});

// DELETE /books/:id - Remove a book
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = books.findIndex((b) => b.id === id);

  // Return 404 if the book does not exist
  if (index === -1) {
    return res.status(404).json({ error: "Book not found" });
  }

  // Remove the book from the array
  books.splice(index, 1);

  // 204 No Content: success with an empty response body
  res.status(204).send();
});

module.exports = router;
