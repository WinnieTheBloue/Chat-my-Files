import express from 'express';
import fileController from '../controllers/fileController.js';
import { isAllowed, isAuthenticated } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', async (req, res, next) => {
    const { csrfProtection } = await import('../app.js');
    csrfProtection(req, res, next)
}, isAuthenticated, isAllowed(['Administrateur', 'Editeur']), fileController.uploadFile);
router.get('/:filename', async (req, res, next) => {
    const { csrfProtection } = await import('../app.js');
    csrfProtection(req, res, next)
}, isAllowed(['Administrateur', 'Editeur', 'Lecteur']),fileController.downloadFile);
router.get('/delete/:filename', async (req, res, next) => {
    const { csrfProtection } = await import('../app.js');
    csrfProtection(req, res, next)
}, isAuthenticated, isAllowed(['Administrateur', 'Editeur']), fileController.deleteFile);

export default router;
