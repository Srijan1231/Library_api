import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

const PORT = process.env.PORT || 8000;

app.use("/", (req, res) => {
  res.json({
    status: "Success",
    message: "Server up and running",
  });
});

app.listen(PORT, (error) => {
  error && console.log(`Server running at http://localhost:${PORT}`);
});
