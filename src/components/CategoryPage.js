// src/components/CategoryPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import MediaList from './Media/MediaList';
import { fetchFilmsByCategory, fetchSeriesByCategory } from '../services/api';

const CategoryPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const [films, setFilms] = useState([]);
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError('ID non trouvé');
      setLoading(false);
      return;
    }

    const loadMedia = async () => {
      try {
        setLoading(true);
        const [filmsData, seriesData] = await Promise.all([
          fetchFilmsByCategory(id),
          fetchSeriesByCategory(id)
        ]);
        setFilms(filmsData);
        setSeries(seriesData);
        setError(null);
      } catch (err) {
        setError('Erreur lors du chargement des médias');
      } finally {
        setLoading(false);
      }
    };
    loadMedia();
  }, [id]);

  if (loading) {
    return <div className="loading">Chargement des médias...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="category-page">
      <br></br>
      <br></br>
      <h1>Médias de la catégorie {id}</h1>
      <h2>Films</h2>
      <div className="media-count">Nombre de films: {films?.length || 0}</div>
      <MediaList mediaItems={films} />
      <h2>Séries</h2>
      <div className="media-count">Nombre de séries: {series?.length || 0}</div>
      <MediaList mediaItems={series} />
    </div>
  );
};

export default CategoryPage;