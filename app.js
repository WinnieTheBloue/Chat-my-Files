import express from 'express';
import helmet from 'helmet';

const app = express();
const port = process.env.PORT || 3030;

app.use(helmet()); 
app.set('view engine', 'ejs'); 
app.use(express.static('public')); 

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});

export default app;