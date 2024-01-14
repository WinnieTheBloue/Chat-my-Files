
function handleErrors(err, req, res, next) {
    console.error(err.stack);
  
    // Envoyer l'erreur à la vue EJS
    res.status(500).render('error', { error: err.message });
  }
  
export default handleErrors;
