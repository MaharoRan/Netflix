import express from 'express';
import { connection } from '../bdd/getConnection.js';
const router = express.Router();

// GET tous les films
router.get('/', async (req, res) => {
  try {
    const [results] = await connection.query(
      'SELECT f.*, c.nomCategorie FROM film f LEFT JOIN categorie c ON f.idCategorie = c.id'
    );
    if (results.length === 0) {
      return res.status(404).json({ error: 'Aucun film ne correspond à cette catégorie' });
    }
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET un film par id
router.get('/:idFilm', async (req, res) => {
  try {
    const [results] = await connection.query(
      'SELECT * FROM film WHERE idFilm = ?',
      [req.params.idFilm]
    );
    res.json(results[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET les films d'une catégorie spécifique
router.get('/categories/:idCategorie', async (req, res) => {
  try {
    const [results] = await connection.query(
      'SELECT f.*, c.nomCategorie FROM film f LEFT JOIN categorie c ON f.idCategorie = c.id WHERE f.idCategorie = ?',
      [req.params.idCategorie]
    );
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST (créer un film)
router.post('/', async (req, res) => {
  const { titre, dateSortie, duree, acteurs, idCategorie } = req.body;
  try {
    const [result] = await connection.query(
      'INSERT INTO film (titre, dateSortie, duree, acteurs, idCategorie) VALUES (?, ?, ?, ?, ?)',
      [titre, dateSortie, duree, acteurs, idCategorie]
    );
    res.status(201).json({ id: result.insertId, titre, dateSortie, duree, acteurs, idCategorie });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT (mettre à jour un film)
router.put('/:idFilm', async (req, res) => {
  const { titre, dateSortie, duree, acteurs, idCategorie } = req.body;
  try {
    const [result] = await connection.query(
      'UPDATE film SET titre = ?, dateSortie = ?, duree = ?, acteurs = ?, idCategorie = ? WHERE idFilm = ?',
      [titre, dateSortie, duree, acteurs, idCategorie, req.params.id]
    );
    res.json({ idFilm: req.params.idFilm, titre, dateSortie, duree, acteurs, idCategorie });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE (supprimer un film)
router.delete('/:idFilm', async (req, res) => {
  try {
    const [result] = await connection.query(
      'DELETE FROM film WHERE idFilm = ?',
      [req.params.idFilm]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;