import { getUserByID } from "../models/user/UserModel.js";

export const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    const user = await getUserByID(authorization);
    if (user?._id) {
      user.password = undefined;
      req.userInfo = user;
      return next();
    }
    res.json({
      status: "error",
      message: "Unauthorized Access, Go back ",
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
};

export const authAdmin = async (req, res, next) => {
  try {
    const { role } = req.userInfo;
    role === "admin"
      ? next()
      : res.status(403).json({
          status: "error",
          message: "Unauthorized Access, Go back ",
        });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
};
