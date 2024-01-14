/**
 * Middleware to check if a user is authenticated.
 * 
 * @param {object} req - The request object from the client.
 * @param {object} res - The response object to send back to the client.
 * @param {function} next - The next function in the middleware chain.
 * @returns If the user is authenticated, the control is passed to the next middleware function, 
 *          otherwise, the user is redirected to the login page.
 */
export const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return next();
    }
    return res.redirect('/login');
}

/**
 * Factory function to create a middleware that checks if the logged-in user has the required role.
 * 
 * @param {string[]} allowedRoles - An array of roles that are permitted to access the route.
 * @returns {function} A middleware function that checks the user's role and either passes control to 
 *          the next middleware or returns a 403 Forbidden response if the user's role is not in the allowedRoles array.
 * @example 
 * // Use this middleware to restrict access to a route to only 'admin' users
 * app.get('/admin', isAllowed(['admin']), (req, res) => {
 *   res.send('Welcome Admin');
 * });
 */
export const isAllowed = (allowedRoles) => {
    return (req, res, next) => {
        if (req.session.user && allowedRoles.includes(req.session.user.role)) {
            return next();
        }
        return res.status(403).json({ error: 'You are not allowed to access this page' })
    }
}