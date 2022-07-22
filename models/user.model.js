import mongoose from "../db.js";
const { Schema } = mongoose;

const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    verified: Boolean,
    salt: String,
});

const User = mongoose.model('User', userSchema);

export default User;