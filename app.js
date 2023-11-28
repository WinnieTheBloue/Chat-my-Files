import express from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import authRoutes from './routes/auth.js';
import filesRoutes from './routes/files.js';
import chatRoutes from './routes/chat.js';
import adminRoutes from './routes/admin.js';

dotenv.config();
const app = express();

const dbUri = process.env.DB_URI;
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connexion à MongoDB réussie"))
  .catch(err => console.error("Erreur de connexion à MongoDB", err));


app.use(helmet());
app.set('view engine', 'ejs');
app.use(express.static('public'));


app.get("/", function (req, res, next) {
    res.send("Ignition!");
  });
app.get('/', (req, res) => res.render('index'));

app.get('/', (req, res) => res.render('index')); 
app.get('/chat', (req, res) => res.render('chat'));
app.get('/admin', (req, res) => res.render('admin'));
app.get('files', (req, res) => res.render('files'));


// app.use('/auth', authRoutes);
// app.use('/files', filesRoutes);
// app.use('/chat', chatRoutes);
// app.use('/admin', adminRoutes);

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));


export default app;