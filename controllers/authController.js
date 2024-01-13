import User from '../models/user.js';

/**
 * `authController` is an object that contains methods for handling authentication:
 * registering new users, logging in existing users, and logging out.
 */
const authController = {
    /**
     * Asynchronously registers a new user. It checks if the password and confirm password match.
     * If they match, it creates a new user with the provided email and password,
     * saves the user to the database, and stores the user data (excluding password) in the session.
     * Redirects to the home page upon successful registration.
     * 
     * @param {Object} req - The HTTP request object, containing the user's email, password, and confirmation password.
     * @param {Object} res - The HTTP response object.
     */
    async register(req, res) {
        try {
            const { email, password, confirm } = req.body;
            if (password !== confirm) {
                return res.status(400).send('Password do not match');
            }
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

    /**
     * Asynchronously logs in a user. It checks if the provided email and password match
     * a user in the database. If they do, it stores the user data (excluding password) in the session
     * and redirects to the home page. Otherwise, it sends an error response.
     * 
     * @param {Object} req - The HTTP request object, containing the user's email and password.
     * @param {Object} res - The HTTP response object.
     */
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (user && await user.comparePassword(password)) {
                req.session.user = { ...user._doc, password: undefined };
                return res.redirect('/');
            } else {
                res.status(400).send('Invalid email or password');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    /**
     * Asynchronously logs out the current user. It destroys the current session
     * and redirects to the home page. If an error occurs during session destruction,
     * it sends an error response.
     * 
     * @param {Object} req - The HTTP request object.
     * @param {Object} res - The HTTP response object.
     */
    async logout(req, res) {
        req.session.destroy(err => {
            if (err) {
                return res.status(500).send(err.message);
            }
            return res.redirect('/');
        });
    },
}

export default authController;
