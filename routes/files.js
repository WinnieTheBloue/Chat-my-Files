import express from 'express';
import fileController from '../controllers/fileController.js';

const router = express.Router();


router.get('/', fileController.listFiles);
router.post('/', fileController.uploadFile);
router.get('/:filename', fileController.downloadFile);
router.get('/delete/:filename', fileController.deleteFile);

export default router;
