import User from '../models/user.js';

const authController = {
    async register(req, res) {
        try {
            const { email, password } = req.body;

            const newUser = new User({
                email,
                password: password
            });

            await newUser.save();

            req.session.user = { ...newUser._doc, password: undefined };
            return res.redirect('/');
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (user && await user.comparePassword(password)) {
                req.session.user = { ...user._doc, password: undefined };
                console.log(req.session.user)
                return res.redirect('/');
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