import express from "express";
import { addBook, deleteBooks, updateBooks } from "../models/book/BookModel.js";
import { getBooks } from "../models/book/BookModel.js";

const router = express.Router();
router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const result = await addBook(req.body);
    result?._id
      ? res.json({
          status: "success",
          message: "New Book Has been Added",
        })
      : res.json({
          status: "error",
          message: "Error,unable to add the book",
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
    const books = await getBooks();
    res.json({
      status: "success",
      message: "Booklist",
      books,
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
    const { __v, _id, ...rest } = req.body;
    const books = await updateBooks(_id, rest);
    res.json({
      status: "success",
      message: "book has been updated successfullly",
      books,
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});
router.delete("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const books = await deleteBooks(_id);
    books?._id
      ? res.json({
          status: "success",
          message: "Book has been deleted",
          books,
        })
      : res.json({
          status: "error",
          message: "Unable to delete",
          books,
        });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

export default router;
