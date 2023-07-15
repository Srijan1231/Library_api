import express from "express";
import { auth } from "../Middleware/authMiddleware.js";
import { addReview, getReview } from "../models/modal/ReviewModel.js";

const router = express.Router();
router.post("/", auth, async (req, res) => {
  try {
    const result = await addReview(req.body);
    if (result?._id) {
      return res.json({
        status: "success",
        message: "Thanks for your review",
      });
    }
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});
router.get("/", async (req, res) => {
  try {
    const reviews = await getReview();

    res.json({
      status: "success",
      message: "Review list sent",
      reviews,
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});
export default router;
