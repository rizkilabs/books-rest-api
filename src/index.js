const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// Parse incoming JSON request bodies
app.use(express.json());

// Health check route to verify the server is running
app.get("/", (req, res) => {
  res.json({ message: "Books REST API is running" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
