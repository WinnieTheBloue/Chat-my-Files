import express from 'express';
import authController from '../controllers/authController.js';

/**
 * Express router for handling authentication routes.
 * 
 * This router is responsible for defining and handling routes associated with
 * user authentication, using the authController to handle the request logic.
 *
 * It defines the following routes:
 * - POST /register: Calls the `register` function from the authController
 *   to handle user registration. This route is used to create new user accounts.
 * - POST /login: Calls the `login` function from the authController
 *   to handle user login. This route is used to authenticate users and initiate a session.
 * - GET /logout: Calls the `logout` function from the authController
 *   to handle user logout. This route is used to end a user's session and log them out.
 */
const router = express.Router();

router.post('/register', authController.register);
router.post('/login',  authController.login);
router.get('/logout', authController.logout);

export default router;
