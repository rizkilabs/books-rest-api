const express = require("express");
const books = require("../data/books");

const router = express.Router();

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

module.exports = router;
