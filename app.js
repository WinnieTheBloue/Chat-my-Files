import express from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';
import filesRoutes from './routes/files.js';
import chatRoutes from './routes/chat.js';
import adminRoutes from './routes/admin.js';

dotenv.config();
const app = express();
app.use(helmet());
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => res.render('index'));
// app.get('/register', (req, res) => res.render('register'));
// app.get('/login', (req, res) => res.render('login'));
app.get('/chat', (req, res) => res.render('chat'));
app.get('/admin', (req, res) => res.render('admin'));
app.get('files', (req, res) => res.render('files'));


app.use('/auth', authRoutes);
app.use('/files', filesRoutes);
app.use('/chat', chatRoutes);
app.use('/admin', adminRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));


export default app;