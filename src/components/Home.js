import React, { useEffect, useState } from 'react';
import { fetchCategories } from '../services/api';
import CategoryList from './Category/CategoryList';
import axios from 'axios';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const categoriesData = await fetchCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      await axios.delete(`/categories/${categoryId}`);
      setCategories(prev => prev.filter(cat => cat.id !== categoryId));
    } catch (error) {
      console.error('Erreur lors de la suppression de la catégorie:', error);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  if (loading) {
    return <div className="loading">Chargement des catégories...</div>;
  }

  return (
    <div className="home">
      <h1>Catégories</h1>
      <CategoryList 
        categories={categories} 
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Home;