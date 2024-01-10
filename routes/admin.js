import express from 'express';
import adminController from '../controllers/adminController.js';

const router = express.Router();

router.post('/users/:id', async (req, res, next) => {
    const { csrfProtection } = await import('../app.js');
    csrfProtection(req, res, next)
}, adminController.updateUser);

export default router;
