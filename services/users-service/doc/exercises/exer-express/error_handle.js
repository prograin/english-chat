import express from "express";

const app = express();

// Simple route
app.get("/users", (req, res) => {
  // Send status and a message
  res.status(202).json({ message: "Accepted" });
});

app.get("/users-error", (req, res, next) => {
  try {
    throw new Error("This is a test error");
  } catch (err) {
    next(err);
  }
});

// Centralized error handler
app.use((err, req, res, next) => {
  console.error(err); // logs "Error: This is a test error"
  res.status(500).json({ message: "Internal Server Error" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
