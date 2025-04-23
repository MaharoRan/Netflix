// src/components/Media/MediaItem.js
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MediaItem = ({ item, onDelete }) => {
  const handleDelete = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce média ?')) {
      try {
        const isFilm = item.duree !== undefined;
        const url = isFilm ? `/films/${item.idFilm}` : `/series/${item.idSerie}`;
        await axios.delete(url);
        onDelete(item);
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        if (error.response && error.response.data) {
          alert(error.response.data.error);
        }
      }
    }
  };

  // Déterminer si c'est un film ou une série
  const isFilm = item.duree !== undefined;
  
  return (
    <div className="media-item-container">
      <Link to={isFilm ? `/film/${item.idFilm}` : `/serie/${item.idSerie}`} className="media-item">
        <div className="media-info">
          <h4>{item.titre}</h4>
          <div className="media-details">
            <p className="media-year">{item.dateSortie}</p>
            {isFilm && (
              <p className="media-duration">Durée: {item.duree} min</p>
            )}
            {!isFilm && (
              <p className="media-episodes">Épisodes: {item.nbEpisodes}</p>
            )}
            {item.acteurs && (
              <p className="media-actors">Acteurs: {item.acteurs}</p>
            )}
          </div>
        </div>
      </Link>
      <div className="action-buttons">
        <button 
          className="delete-button" 
          onClick={handleDelete}
          title="Supprimer"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default MediaItem;