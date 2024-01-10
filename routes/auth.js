import express from 'express';
import authController from '../controllers/authController.js';
import { csrfProtection } from '../app.js';

const router = express.Router();

router.post('/register', async (req, res, next) => {
    const { csrfProtection } = await import('../app.js');
    csrfProtection(req, res, next)
}, authController.register);
router.post('/login', async (req, res, next) => {
    const { csrfProtection } = await import('../app.js');
    csrfProtection(req, res, next)
}, authController.login);
router.get('/logout', authController.logout);

export default router;
