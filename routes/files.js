import express from 'express';
import * as fileController from '../controllers/fileController.js';

const router = express.Router();

router.get('/', fileController.listFiles);
router.post('/', fileController.uploadFile);
router.get('/:id', fileController.downloadFile);
router.delete('/:id', fileController.deleteFile);

export default router;
