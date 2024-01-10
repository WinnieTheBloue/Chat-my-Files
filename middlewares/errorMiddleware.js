const handleErrors = (err, req, res, next) => {
    console.error(err); // Log de l'erreur pour le suivi

    // Ajoutez ici toute logique de traitement d'erreur supplémentaire si nécessaire

    // Vérifiez si la requête est une requête AJAX
    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
        // Réponse JSON pour les requêtes AJAX
        let statusCode = 500; // Code d'erreur par défaut
        let errorMessage = 'Internal Server Error';

        // Personnalisez le message d'erreur en fonction du type d'erreur
        if (err.status === 400) {
            statusCode = 400;
            errorMessage = err.message || 'Bad Request';
        } else if (err.status === 403) {
            statusCode = 403;
            errorMessage = err.message || 'Forbidden';
        }

        return res.status(statusCode).json({ error: errorMessage });
    }

    // Sinon, renvoyez l'erreur à la vue
    res.locals.error = err;

    // Personnalisez le message d'erreur en fonction du type d'erreur
    let statusCode = 500; // Code d'erreur par défaut
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
