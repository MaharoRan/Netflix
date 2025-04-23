import React, { useState } from 'react';
import axios from 'axios';

const AddCategory = () => {
  const [nomCategorie, setNomCategorie] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/categories', { nomCategorie });
      setSuccess('Catégorie ajoutée avec succès !');
      setNomCategorie('');
      setError('');
    } catch (err) {
      setError('Erreur lors de l\'ajout de la catégorie');
      setSuccess('');
    }
  };

  return (
    <div className="add-form">
      <h3>Ajouter une catégorie</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nomCategorie}
          onChange={(e) => setNomCategorie(e.target.value)}
          placeholder="Nom de la catégorie"
          required
        />
        <button type="submit">Ajouter</button>
      </form>
      {success && <div className="success-message">{success}</div>}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default AddCategory;