import mongoose from "../db.js";
import bcrypt from "bcrypt";
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "username required"],
  },
  password: { type: String, required: [true, "password required"] },
  email: { type: String, unique: true, required: [true, "e-mail required"] },
  verified: Boolean,
  salt: String,
});

userSchema.pre("save", async function (next) {
  if (this.password) {
    try {
      this.password = await bcrypt.hash(this.password, 12);
    } catch (e) {
      next("Falha ao gerar hash do password");
    }
  }

  next();
});

const User = mongoose.model("User", userSchema);

export default User;
