/**
 * Middleware for handling errors in an Express application.
 * This function logs the error, determines the type of request,
 * and sends an appropriate response.
 * 
 * For XHR (XMLHttpRequest) or requests that accept JSON, it sends a JSON response.
 * For other requests, it renders an error page.
 * 
 * The error response includes the status code and an error message.
 * The status code defaults to 500 (Internal Server Error), but can be
 * 400 (Bad Request) or 403 (Forbidden) based on the error's status property.
 * The error message is taken from the error object if available, or defaults
 * to a generic message based on the status code.
 *
 * @param {object} err - The error object, potentially with a 'status' property.
 * @param {object} req - The request object. Its 'xhr' property and 'headers.accept'
 *                       are used to determine if the response should be JSON.
 * @param {object} res - The response object. Used to send the error response.
 * @param {function} next - The next middleware function in the stack.
 */
const handleErrors = (err, req, res, next) => {
    console.error(err);

    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
        let statusCode = 500;
        let errorMessage = 'Internal Server Error';

        if (err.status === 400) {
            statusCode = 400;
            errorMessage = err.message || 'Bad Request';
        } else if (err.status === 403) {
            statusCode = 403;
            errorMessage = err.message || 'Forbidden';
        }

        return res.status(statusCode).json({ error: errorMessage });
    }

    res.locals.error = err;
    res.locals.errors = []; // Always initialize to an empty array

    let statusCode = 500;
    let errorMessage = 'Internal Server Error';

    if (err.status === 400) {
        statusCode = 400;
        errorMessage = err.message || 'Bad Request';
    } else if (err.status === 403) {
        statusCode = 403;
        errorMessage = err.message || 'Forbidden';
    }

    res.status(statusCode).render('error', { error: errorMessage });
};

export default handleErrors;