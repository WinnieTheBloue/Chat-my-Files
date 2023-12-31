import express from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import session from 'express-session';
import chatController from './controllers/chatController.js';

import authRoutes from './routes/auth.js';
import filesRoutes from './routes/files.js';
import chatRoutes from './routes/chat.js';
import adminRoutes from './routes/admin.js';

import { isAuthenticated, isAllowed } from './middlewares/authMiddleware.js';

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

app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
}));


// app.get('/', isAuthenticated, (req, res) => res.render('index'));

app.get('/', isAuthenticated, (req, res) => {
  res.render('index', { user: session.user });
});


app.get('/', (req, res) => res.render('index'));
app.get('/register', (req, res) => res.render('register'));
app.get('/login', (req, res) => res.render('login'));
app.get('/chat', async (req, res) => {
  try {
    const messages = await chatController.getMessages();
    res.render('chat', { messages });
  } catch (error) {
    res.status(500).send(error.message);
  }
});
app.get('/admin', (req, res) => res.render('admin'));
app.get('files', (req, res) => res.render('files'));


app.use('/auth', authRoutes);
app.use('/files', filesRoutes);
app.use('/chat', chatRoutes);
app.use('/admin', adminRoutes);

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));


export default app;