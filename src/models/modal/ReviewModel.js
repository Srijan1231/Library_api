import ReviewSchema from "./ReviewSchema.js";

export const addReview = (bookObj) => {
  return ReviewSchema(bookObj).save();
};
export const getReview = () => {
  return ReviewSchema.find();
};

export const updateReview = (_id, obj) => {
  return ReviewSchema.findByIdAndUpdate(_id, obj);
};
export const deleteReview = (_id) => {
  return ReviewSchema.findByIdAndDelete(_id);
};
