import express from 'express';
import * as chatController from '../controllers/chatController.js';

const router = express.Router();

router.get('/messages', chatController.getMessages);
router.post('/messages', chatController.postMessage);
router.delete('/messages/:id', chatController.deleteMessage);

export default router;
