export const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return next();
    }
    return res.redirect('/login');
}

export const isAllowed = (...allowedRoles) => {
    return (req, res, next) => {
        if (req.session.user && allowedRoles.includes(req.session.user.role)) {
            return next();
        }
        return res.status(403).send('You are not allowed to access this page')
    }
}

// export default { isAllowed, isAuthenticated};
