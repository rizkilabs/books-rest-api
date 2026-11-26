// In-memory storage for books (resets every time the server restarts)
const books = [
  {
    id: 1,
    title: "Clean Code",
    author: "Robert C. Martin",
    year: 2008,
  },
  {
    id: 2,
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt and David Thomas",
    year: 1999,
  },
  {
    id: 3,
    title: "You Don't Know JS",
    author: "Kyle Simpson",
    year: 2015,
  },
];

module.exports = books;
