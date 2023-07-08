import BurrowSchema from "./BurrowSchema.js";

export const addBurrow = (bookObj) => {
  return BurrowSchema(bookObj).save();
};
export const getBurrows = () => {
  return BurrowSchema.find();
};
export const getBurrowbyUserId = (userId) => {
  return BurrowSchema.find(userId);
};
export const updateBurrow = (_id, obj) => {
  return BurrowSchema.findByIdAndUpdate(_id, obj);
};
export const deleteBurrow = (_id) => {
  return BurrowSchema.findByIdAndDelete(_id);
};
