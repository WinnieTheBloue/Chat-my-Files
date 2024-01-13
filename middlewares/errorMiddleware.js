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
    res.locals.errors = [errorMessage];

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
