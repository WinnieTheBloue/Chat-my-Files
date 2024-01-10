import express from 'express';
import chatController from '../controllers/chatController.js';
import { isAllowed, isAuthenticated } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/messages', async (req, res, next) => {
    const { csrfProtection } = await import('../app.js');
    csrfProtection(req, res, next)
}, isAuthenticated, isAllowed(['Administrateur', 'Editeur']), chatController.postMessage);
router.post('/messages/:id', async (req, res, next) => {
    const { csrfProtection } = await import('../app.js');
    csrfProtection(req, res, next)
}, isAuthenticated, isAllowed(['Administrateur']), chatController.deleteMessage);

export default router;
