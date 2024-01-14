import express from 'express';
import fileController from '../controllers/fileController.js';
import { isAllowed, isAuthenticated } from '../middlewares/authMiddleware.js';

/**
 * Express router for handling file-related routes with authentication and authorization.
 * 
 * This router is responsible for defining and handling routes related to file operations.
 * It includes middleware for authentication and authorization checks before allowing
 * access to certain routes.
 *
 * It defines the following routes:
 * - POST /: Calls the `uploadFile` function from the fileController
 *   to handle uploading a file. Requires user authentication and authorization
 *   for 'Administrateur' and 'Editeur' roles.
 * - GET /:filename: Calls the `downloadFile` function from the fileController
 *   to handle downloading a file by its filename. Requires user authentication and
 *   authorization for 'Administrateur', 'Editeur', and 'Lecteur' roles.
 * - GET /delete/:filename: Calls the `deleteFile` function from the fileController
 *   to handle deleting a file by its filename. Requires user authentication and
 *   authorization for 'Administrateur' and 'Editeur' roles.
 *
 * Middleware Used:
 * - isAuthenticated: Ensures that the user is authenticated before accessing the routes.
 * - isAllowed: Performs role-based authorization checks to restrict access to specific roles.
 */
const router = express.Router();

router.post('/', isAuthenticated, isAllowed(['Administrateur', 'Editeur']), fileController.uploadFile);
router.get('/:filename', isAllowed(['Administrateur', 'Editeur', 'Lecteur']),fileController.downloadFile);
router.get('/delete/:filename', isAuthenticated, isAllowed(['Administrateur', 'Editeur']), fileController.deleteFile);

export default router;
