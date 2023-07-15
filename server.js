import dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";

const app = express();
import cors from "cors";

const PORT = process.env.PORT || 8000;

//connect database
import connectMongoDB from "./src/config/mongoConfig.js";
connectMongoDB();
// middleware
import { auth } from "./src/Middleware/authMiddleware.js";
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
// apis

//api for user
import userRouter from "./src/Routers/userRouter.js";
import bookRouter from "./src/Routers/bookRouter.js";
app.use("/api/v1/user", userRouter);
app.use("/api/v1/user", (req, res) => {
  res.json({
    status: "Success",
    message: "Server up and running at user",
  });
});
//api for book/
app.use("/api/v1/book", bookRouter);
//api for burrowed books/
import burrowRouter from "./src/Routers/burrowRouter.js";
app.use("/api/v1/burrow", auth, burrowRouter);
//api for review book
import reviewRouter from "./src/Routers/reviewRouter.js";
app.use("/api/v1/review", reviewRouter);

app.use("/", (req, res) => {
  res.json({
    status: "Success",
    message: "Server up and running",
  });
});

app.listen(PORT, (error) => {
  error && console.log(`Server running at http://localhost:${PORT}`);
});
