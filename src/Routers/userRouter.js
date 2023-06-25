import express from "express";
import { insertUser } from "../models/user/UserModel.js";
import { hashPassword } from "../utils/bcrypt.js";
const router = express.Router();

router.get("/", (req, res) => {
  try {
    console.log(req.body);
    res.json({
      status: "success",
      message: "Welcome to user",
    });
  } catch (error) {
    console.log(error);
  }
});
router.post("/", async (req, res) => {
  try {
    const { password } = req.body;
    req.body.password = hashPassword(password);

    const user = await insertUser(req.body);
    user?._id
      ? res.json({
          status: "success",
          message: "New user has been created",
          user,
        })
      : res.json({
          status: "error",
          message: "Unable to create user",
          user,
        });
  } catch (error) {
    let msg = error.message;

    if (msg.includes("E11000 duplicate key error")) {
      msg = "There is another user who uses this email in the system";
    }
    res.json({
      status: "error",
      message: msg,
    });
  }
});
export default router;
