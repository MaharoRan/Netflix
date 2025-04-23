import express from 'express';
import { connection } from '../bdd/getConnection.js';
const router = express.Router();

// GET toutes les séries
router.get('/', async (req, res) => {
  try {
    const [results] = await connection.query(
      'SELECT s.*, c.nomCategorie FROM serie s LEFT JOIN categorie c ON s.idCategorie = c.id'
    );
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET une série par id
router.get('/:idSerie', async (req, res) => {
  try {
    const [results] = await connection.query(
      'SELECT * FROM serie WHERE idSerie = ?',
      [req.params.idSerie]
    );
    if (results.length === 0) {
      return res.status(404).json({ error: 'Série non trouvée' });
    }
    res.json(results[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET les séries d'une catégorie spécifique
router.get('/categories/:idCategorie', async (req, res) => {
  try {
    const [results] = await connection.query(
      'SELECT s.*, c.nomCategorie FROM serie s LEFT JOIN categorie c ON s.idCategorie = c.id WHERE s.idCategorie = ?',
      [req.params.idCategorie]
    );
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST (créer une série)
router.post('/', async (req, res) => {
  const { titre, dateSortie, acteurs, nbParties, nbEpisodes, idCategorie } = req.body;
  try {
    const [result] = await connection.query(
      'INSERT INTO serie (titre, dateSortie, acteurs, nbParties, nbEpisodes, idCategorie) VALUES (?, ?, ?, ?, ?, ?)',
      [titre, dateSortie, acteurs, nbParties, nbEpisodes, idCategorie]
    );
    res.status(201).json({ id: result.insertId, titre, dateSortie, acteurs, nbParties, nbEpisodes, idCategorie });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT (mettre à jour une série)
router.put('/:idSerie', async (req, res) => {
  const { titre, dateSortie, acteurs, nbParties, nbEpisodes, idCategorie } = req.body;
  try {
    const [result] = await connection.query(
      'UPDATE serie SET titre = ?, dateSortie = ?, acteurs = ?, nbParties = ?, nbEpisodes = ?, idCategorie = ? WHERE idSerie = ?',
      [titre, dateSortie, acteurs, nbParties, nbEpisodes, idCategorie, req.params.id]
    );
    res.json({ idSerie: req.params.idSerie, titre, dateSortie, acteurs, nbParties, nbEpisodes, idCategorie });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE (supprimer une série)
router.delete('/:idSerie', async (req, res) => {
  try {
    const [result] = await connection.query(
      'DELETE FROM serie WHERE idSerie = ?',
      [req.params.idSerie]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;