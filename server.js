import dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
const app = express();

const PORT = process.env.PORT || 8000;

//connect database
import connectMongoDB from "./src/config/mongoConfig.js";
connectMongoDB();
// middleware
app.use(morgan("dev"));
app.use(express.json());
// apis

//api for user
import userRouter from "./src/Routers/userRouter.js";
app.use("/api/v1/user", userRouter);
app.use("/api/v1/user", (req, res) => {
  res.json({
    status: "Success",
    message: "Server up and running at user",
  });
});

app.use("/", (req, res) => {
  res.json({
    status: "Success",
    message: "Server up and running",
  });
});

app.listen(PORT, (error) => {
  error && console.log(`Server running at http://localhost:${PORT}`);
});