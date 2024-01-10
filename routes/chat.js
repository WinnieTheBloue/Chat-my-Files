import express from 'express';
import chatController from '../controllers/chatController.js';
import { isAllowed, isAuthenticated } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/messages', isAuthenticated, isAllowed(['Administrateur', 'Editeur']), chatController.postMessage);
router.post('/messages/:id', isAuthenticated, isAllowed(['Administrateur']), chatController.deleteMessage);

export default router;
