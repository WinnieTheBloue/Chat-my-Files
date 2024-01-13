import User from '../models/user.js';

/**
 * `adminController` is an object that contains methods for managing user data.
 * It includes functions to list users, update user information, and delete users.
 */
const adminController = {
    /**
     * Asynchronously lists all users in the database, excluding their password fields.
     * 
     * @param {Object} req - The HTTP request object.
     * @param {Object} res - The HTTP response object.
     * @returns {Promise<Array>} A promise that resolves to an array of user objects.
     */
    async listUsers(req, res) {
        try {
            const users = await User.find().select('-password');
            return users;
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    /**
     * Asynchronously updates a user's information based on the user ID provided in the request parameters.
     * Specifically, updates the user's role to the value provided in the request body.
     * 
     * @param {Object} req - The HTTP request object, containing the user ID in the URL parameters and the new role in the body.
     * @param {Object} res - The HTTP response object.
     */
    async updateUser(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, { role: req.body.role }, { new: true });
            if (!user) {
                return res.status(404).json({ message: "Utilisateur non trouvé" });
            }
            res.redirect('/admin');
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    /**
     * Asynchronously deletes a user based on the user ID provided in the request parameters.
     * 
     * @param {Object} req - The HTTP request object, containing the user ID in the URL parameters.
     * @param {Object} res - The HTTP response object.
     */
    async deleteUser(req, res) {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            if (!user) {
                return res.status(404).json({ message: "Utilisateur non trouvé" });
            }
            res.json({ message: "Utilisateur supprimé avec succès" });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
};

export default adminController;
