import { mongoose } from "mongoose";
const connectMongoDB = () => {
  try {
    const conn = mongoose.connect(process.env.MONGO_CLIENT);
    conn && console.log("MONGO Connected");
  } catch (error) {
    console.log(error);
  }
};
export default connectMongoDB;
