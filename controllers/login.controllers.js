import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const login = async (req, res, next) => {
  const { user, password } = req.body;

  try {
    const findUser = await User.findOne({
      $or: [{ email: user }, { username: user }],
    });
    if (!findUser) return next("invalid username or password");

    const isPassword = await bcrypt.compare(password, findUser.password);
    if (!isPassword) return next("invalid username or password");

    const { username, email } = findUser;
    jwt.sign({ username, email }, process.env.SECRET, (err, token) => {
      if (err) return next("JWT creation failed");

      return res.status(200).json({ token });
    });
  } catch (e) {
    next("login failed");
  }
};
