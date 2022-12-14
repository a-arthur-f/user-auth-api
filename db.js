import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DB_URI = process.env.DB_URI;

mongoose.connect(DB_URI, {
  autoIndex: true,
});

export default mongoose;
