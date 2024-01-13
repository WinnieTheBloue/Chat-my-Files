import express from 'express';
import fileController from '../controllers/fileController.js';
import { isAllowed, isAuthenticated } from '../middlewares/authMiddleware.js';


const router = express.Router();

router.post('/', isAuthenticated, isAllowed(['Administrateur', 'Editeur']), fileController.uploadFile);
router.get('/:filename', isAllowed(['Administrateur', 'Editeur', 'Lecteur']),fileController.downloadFile);
router.get('/delete/:filename', isAuthenticated, isAllowed(['Administrateur', 'Editeur']), fileController.deleteFile);

export default router;
