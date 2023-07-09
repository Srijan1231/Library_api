import express from "express";

import {
  addBurrow,
  getBurrowbyUserId,
  getBurrows,
  updateBurrow,
} from "../models/burrow/BurrowModel.js";
import { updateBooks } from "../models/book/BookModel.js";

const router = express.Router();
const twoWeeks = 14;
router.post("/", async (req, res) => {
  try {
    const dueDate = new Date();
    console.log(dueDate);
    dueDate.setDate(dueDate.getDate() + twoWeeks);
    req.body.dueDate = dueDate;

    // create new burrow details in db
    const result = await addBurrow(req.body);

    if (result?._id) {
      // make book not availe and give the dueDate
      const update = await updateBooks(req.body.bookId, {
        isAvailable: false,
        dueDate,
        returnDate: null,
      });

      if (update?._id) {
        return res.json({
          status: "success",
          message: "You book has been burrowed and updated in the system",
        });
      }
    }
    res.json({
      status: "error",
      message: "unable to burrow the book now, Please try gain later",
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});
router.get("/", async (req, res) => {
  try {
    const { role, _id } = req.userInfo;

    const burrows =
      role === "admin" ? await getBurrows() : await getBurrowbyUserId(_id);
    res.json({
      status: "success",
      message: "Burrowlist",
      burrows,
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});
router.put("/", async (req, res) => {
  try {
    const { _id } = req.body;

    const presentDate = new Date();

    const returnBooks = await updateBurrow(_id, {
      isRetured: true,
      dueDate: null,
      returnDate: presentDate,
    });

    returnBooks?._id
      ? res.json({
          status: "success",
          message: "Burrowed books has been updated successfullly",
        })
      : res.json({
          status: "error",
          message: "Book hasn't been returned",
        });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});
export default router;
