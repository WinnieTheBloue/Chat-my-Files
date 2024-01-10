import User from '../models/user.js';

const adminController = {
    async listUsers(req, res) {
        try {
            const users = await User.find().select('-password');
            return users;
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

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
