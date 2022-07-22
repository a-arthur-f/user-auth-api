import User from '../models/user.model.js';
import bcrypt from 'bcrypt';

const userController = {
    async get(req, res) {
        const { id } = req.params;

        try {
            if (id) {
                const user = await User.findOne({ _id: id }, { username: 1, email: 1 });
                return res.status(200).json(user);
            }

            const users = await User.find({}, { username: 1, email: 1 });
            return res.status(200).json(users);
        } catch (e) {
            return res.status(404).json({ msg: 'user not found' });
        }
    },

    async post(req, res) {
        const { username, password, email } = req.body;
        if (!username || !password || !email) {
            const errors = [];
            if (!username) errors.push('invalid username');
            if (!password) errors.push('invalid password');
            if (!email) errors.push('invalid email');

            return res.status(400).json({ errors: [...errors] });
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({
                username,
                password: hashedPassword,
                email,
                verified: false,
            })

            user.save(err => {
                if (err) return console.log(err);
            })

            res.status(200).json({
                msg: 'user created'
            })
        } catch (e) {
            console.log(e);
        }

    },

    async put(req, res) {
        const { id } = req.params;
        const { email, username } = req.body

        try {
            const { modifiedCount } = await User.updateOne({ _id: id }, { email, username });
            return res.status(200).json({ msg: 'user updated', modifiedCount });
        } catch (e) {
            return res.status(400).json({ errors: ['user update failed'] });
        }
    },

    async delete(req, res) {
        const { id } = req.params;

        try {
            const { deletedCount } = await User.deleteOne({ _id: id });
            return res.status(200).json({ deletedCount });
        } catch (e) {
            return res.status(400).json({ errors: ['delete failed'] })
        }
    }
}

export default userController;