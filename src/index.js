const express = require("express");
const booksRouter = require("./routes/books");

const app = express();
const PORT = process.env.PORT || 3000;

// Parse incoming JSON request bodies
app.use(express.json());

// Health check route to verify the server is running
app.get("/", (req, res) => {
  res.json({ message: "Books REST API is running" });
});

// Mount the books router
app.use("/books", booksRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
