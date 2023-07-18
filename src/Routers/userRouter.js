import express from "express";
import { insertUser } from "../models/user/UserModel.js";
import { hashPassword } from "../utils/bcrypt.js";
import { getUserByEmail } from "../models/user/UserModel.js";
import { comparePassword } from "../utils/bcrypt.js";
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
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (user?._id) {
      const isMatch = comparePassword(password, user.password);

      if (isMatch) {
        user.password = undefined;
        return res.json({
          status: "success",
          message: `Welcome  ${user.fName}`,
          user,
        });
      }
    }
    res.json({
      status: "error",
      message: "Username or Password incorrect",
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});
export default router;
