import React, { useState,useEffect  } from 'react';
import axios from 'axios';

const AddFilm = () => {
  const [titre, setTitre] = useState('');
  const [dateSortie, setDateSortie] = useState('');
  const [duree, setDuree] = useState('');
  const [acteurs, setActeurs] = useState('');
  const [idCategorie, setIdCategorie] = useState('');
  const [categories, setCategories] = useState([]);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/films', {
        titre,
        dateSortie,
        duree,
        acteurs,
        idCategorie
      });
      setSuccess('Film ajouté avec succès !');
      setTitre('');
      setDateSortie('');
      setDuree('');
      setActeurs('');
      setIdCategorie('');
      setError('');
    } catch (err) {
      setError('Erreur lors de l\'ajout du film');
      setSuccess('');
    }
  };

  return (
    <div className="add-form">
      <h3>Ajouter un film</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
          placeholder="Titre"
          required
        />
        <input
          type="number"
          value={dateSortie}
          onChange={(e) => setDateSortie(e.target.value)}
          placeholder="Année de sortie"
          required
        />
        <input
          type="text"
          value={duree}
          onChange={(e) => setDuree(e.target.value)}
          placeholder="Durée (ex: 2h30)"
          required
        />
        <input
          type="text"
          value={acteurs}
          onChange={(e) => setActeurs(e.target.value)}
          placeholder="Acteurs (séparés par des virgules)"
          required
        />
        <select
          value={idCategorie}
          onChange={(e) => setIdCategorie(e.target.value)}
          required
        >
          <option value="">Sélectionnez une catégorie</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nomCategorie}
            </option>
          ))}
        </select>
        <button type="submit">Ajouter</button>
      </form>
      {success && <div className="success-message">{success}</div>}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default AddFilm;