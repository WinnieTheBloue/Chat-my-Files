import express from 'express';
import adminController from '../controllers/adminController.js';

const router = express.Router();

router.post('/users/:id', adminController.updateUser);

export default router;
