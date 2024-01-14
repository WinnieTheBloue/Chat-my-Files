import express from 'express';
import chatController from '../controllers/chatController.js';
import { isAllowed, isAuthenticated } from '../middlewares/authMiddleware.js';

/**
 * Express router for handling chat-related routes with authentication and authorization.
 * 
 * This router is responsible for defining and handling routes related to chat messages.
 * It includes middleware for authentication and authorization checks before allowing
 * access to certain routes.
 *
 * It defines the following routes:
 * - POST /messages: Calls the `postMessage` function from the chatController
 *   to handle posting a new message. Requires user authentication and authorization for
 *   'Administrateur' and 'Editeur' roles.
 * - POST /messages/:id: Calls the `deleteMessage` function from the chatController
 *   to handle deleting a message by its ID. Requires user authentication and authorization
 *   for the 'Administrateur' role.
 *
 * Middleware Used:
 * - isAuthenticated: Ensures that the user is authenticated before accessing the routes.
 * - isAllowed: Performs role-based authorization checks to restrict access to specific roles.
 */
const router = express.Router();

router.post('/messages', isAuthenticated, isAllowed(['Administrateur', 'Editeur']), chatController.postMessage);
router.post('/messages/:id', isAuthenticated, isAllowed(['Administrateur']), chatController.deleteMessage);

export default router;