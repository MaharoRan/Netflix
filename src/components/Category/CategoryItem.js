import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CategoryItem = ({ category, onDelete }) => {
  const handleDelete = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
      try {
        await axios.delete(`/categories/${category.id}`);
        onDelete(category.id);
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
      }
    }
  };

  return (
    <div className="category-item-container">
      <Link to={`/categories/${category.id}`} className="category-item">
        <h3>{category.nomCategorie}</h3>
      </Link>
      <button 
        className="delete-button" 
        onClick={handleDelete}
        title="Supprimer"
      >
        ×
      </button>
    </div>
  );
};

export default CategoryItem;