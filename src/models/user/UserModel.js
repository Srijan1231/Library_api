import UserSchema from "./UserSchema.js";

export const insertUser = (userObj) => {
  return UserSchema(userObj).save();
};
export const getUserByEmail = (email) => {
  return UserSchema.findOne({ email });
};
export const getUserByID = (_id) => {
  return UserSchema.findById({ _id });
};
