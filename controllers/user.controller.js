import User from "../models/user.model.js";

const userController = {
  async get(req, res, next) {
    const { id } = req.params;

    try {
      if (id) {
        const user = await User.findOne({ _id: id }, { username: 1, email: 1 });
        return res.status(200).json(user);
      }

      const users = await User.find({}, { username: 1, email: 1 });
      return res.status(200).json(users);
    } catch (e) {
      next("failed on get user");
    }
  },

  async create(req, res, next) {
    const { username, password, email } = req.body;

    try {
      const user = new User({
        username,
        email,
        password,
        verified: false,
      });

      await user.save();

      res.status(200).json({
        msg: "user created",
      });
    } catch (e) {
      next(e);
    }
  },

  async update(req, res, next) {
    const { id } = req.params;
    const { email, username } = req.body;

    try {
      const { modifiedCount } = await User.updateOne(
        { _id: id },
        { email, username }
      );
      return res.status(200).json({ msg: "user updated", modifiedCount });
    } catch (e) {
      next("user update failed");
    }
  },

  async delete(req, res, next) {
    const { id } = req.params;

    try {
      const { deletedCount } = await User.deleteOne({ _id: id });
      return res.status(200).json({ deletedCount });
    } catch (e) {
      next("deletion failed");
    }
  },
};

export default userController;
