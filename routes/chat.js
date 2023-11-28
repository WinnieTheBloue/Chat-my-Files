import express from 'express';
import chatController from '../controllers/chatController.js';

const router = express.Router();

// router.get('/', chatController.getMessages);
router.post('/messages', chatController.postMessage);
router.delete('/messages/:id', chatController.deleteMessage);

export default router;
