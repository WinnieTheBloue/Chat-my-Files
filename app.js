import express from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import session from 'express-session';
import csrf from 'csurf';
import cookieParser from 'cookie-parser';
import chatController from './controllers/chatController.js';
import adminController from './controllers/adminController.js';
import fileController from './controllers/fileController.js';

import authRoutes from './routes/auth.js';
import filesRoutes from './routes/files.js';
import chatRoutes from './routes/chat.js';
import adminRoutes from './routes/admin.js';

import { isAuthenticated, isAllowed } from './middlewares/authMiddleware.js';

import handleErrors from './middlewares/errorMiddleware.js';

dotenv.config();
const app = express();

const dbUri = process.env.DB_URI;
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connexion à MongoDB réussie"))
  .catch(err => console.error("Erreur de connexion à MongoDB", err));


app.use(helmet());
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(handleErrors);

app.use(cookieParser());

app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
}));

export const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);


app.get('/', isAuthenticated, (req, res) => {
  res.render('index', { user: req.session.user });
});


app.get('/', (req, res) => res.render('index'));
app.get('/register', csrfProtection, (req, res) => res.render('register', { errors: res.locals.errors || [], csrfToken: req.csrfToken() }));
app.get('/login', csrfProtection, (req, res) => res.render('login', { errors: res.locals.errors || [], csrfToken: req.csrfToken() }));
app.get('/chat', csrfProtection, isAuthenticated, isAllowed(['Administrateur', 'Editeur', 'Lecteur']), async (req, res) => {
  try {
    const messages = await chatController.getMessages();
    const user = req.session.user;
    res.render('chat', { messages, user, csrfToken: req.csrfToken() });
  } catch (error) {
    res.status(500).send(error.message);
  }
});
app.get('/admin', csrfProtection, isAuthenticated, isAllowed(['Administrateur']), async (req, res) => {
  try {
    const users = await adminController.listUsers();
    const user = req.session.user;
    res.render('admin', { users, user, csrfToken: req.csrfToken() });
  } catch (error) {
    res.status(500).send(error.message);
  }
});
app.get('/files', csrfProtection, isAuthenticated, isAllowed(['Administrateur', 'Editeur', 'Lecteur']), async (req, res) => {
  try {
    const files = await fileController.listFiles();
    const user = req.session.user;
    res.render('files', { files, user, csrfToken: req.csrfToken() });
  } catch (error) {
    res.status(500).send(error.message);
  }
});


// Hello
app.use('/auth', csrfProtection, authRoutes);
app.use('/files', csrfProtection, filesRoutes);
app.use('/chat', csrfProtection, chatRoutes);
app.use('/admin', csrfProtection, adminRoutes);



const PORT = process.env.PORT || 3030;
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));

export default app;