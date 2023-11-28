import User from '../models/user.js';
import bcrypt from 'bcrypt';
import session from 'express-session';

const authController = {
    async register(req, res) {
        try {
            const { email, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                email,
                password: hashedPassword
            });

            await newUser.save();
            req.session.userId = newUser._id;
            res.status(201).send('User registered successfully');
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (user && await bcrypt.compare(password, user.password)) {
                req.session.userId = user._id;
                res.send('User logged in successfully');
            } else {
                res.status(400).send('Invalid email or password');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    async logout(req, res) {
        req.session.destroy(err => {
            if (err) {
                return res.status(500).send(err.message);
            }
            res.send('User logged out successfully');
        });
    },
}
export default authController