import express from 'express';
import adminController from '../controllers/adminController.js';
import { isAllowed, isAuthenticated } from '../middlewares/authMiddleware.js';

/**
 * Express router for handling administrative actions related to users.
 * 
 * This router is responsible for defining and handling routes associated with
 * administrative actions on user accounts. It includes middleware for authentication
 * and authorization checks before allowing access to certain routes.
 *
 * It defines the following route:
 * - POST /users/:id: Calls the `updateUser` function from the adminController
 *   to handle updating user details. Requires user authentication and authorization
 *   for the 'Administrateur' role. The `:id` in the route is a dynamic parameter
 *   representing the unique identifier of the user to be updated.
 *
 * Middleware Used:
 * - isAuthenticated: Ensures that the user is authenticated before accessing the route.
 * - isAllowed: Performs role-based authorization checks to restrict access to specific roles.
 */
const router = express.Router();

router.post('/users/:id', isAuthenticated, isAllowed(['Administrateur']), adminController.updateUser);

export default router;
