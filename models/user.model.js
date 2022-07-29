import mongoose from "../db.js";
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

const User = mongoose.model('User', userSchema);

export default User;