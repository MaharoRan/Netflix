import express from 'express';
import { connection } from '../bdd/getConnection.js';
const router = express.Router();

// GET toutes les catégories
router.get('/', async (req, res) => {
  try {
    const [results] = await connection.query('SELECT * FROM categorie');
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET une catégorie par id
router.get('/:id', async (req, res) => {
  try {
    const [results] = await connection.query(
      'SELECT * FROM categorie WHERE id = ?',
      [req.params.id]
    );
    if (results.length === 0) {
      return res.status(404).json({ error: 'Catégorie non trouvée' });
    }
    res.json(results[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST (créer une catégorie)
router.post('/', async (req, res) => {
  const { nomCategorie } = req.body;
  try {
    const [result] = await connection.query(
      'INSERT INTO categorie (nomCategorie) VALUES (?)',
      [nomCategorie]
    );
    res.status(201).json({ idCategorie: result.insertId, nomCategorie });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT (mettre à jour une catégorie)
router.put('/:id', async (req, res) => {
  const { nomCategorie } = req.body;
  try {
    const [result] = await connection.query(
      'UPDATE categorie SET nomCategorie = ? WHERE id = ?',
      [nomCategorie, req.params.id]
    );
    res.json({ id: req.params.id, nomCategorie });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE (supprimer une catégorie)
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await connection.query(
      'DELETE FROM categorie WHERE id = ?',
      [req.params.id]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;