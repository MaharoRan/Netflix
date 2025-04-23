import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { connection } from './bdd/getConnection.js';
import filmRoutes from './routes/film.js';
import categorieRoutes from './routes/categorie.js';
import serieRoutes from './routes/serie.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Serveur les fichiers statiques
app.use(express.static(path.join(__dirname, '../public')));

app.use(express.json());

// Route pour la racine qui sert l'application React
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use('/films', filmRoutes);
app.use('/categories', categorieRoutes);
app.use('/series', serieRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});