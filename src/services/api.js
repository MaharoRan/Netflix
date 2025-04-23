
import axios from 'axios';

export const fetchCategories = async () => {
  try {
    const response = await axios.get('/categories');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error);
    throw error;
  }
};

export const fetchFilmsByCategory = async (idCategorie) => {
  try {
    const response = await axios.get(`/films/categories/${idCategorie}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des films:', error);
    throw error;
  }
};

export const fetchSeriesByCategory = async (idCategorie) => {
  try {
    const response = await axios.get(`/series/categories/${idCategorie}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des séries:', error);
    throw error;
  }
};

export const fetchFilmById = async (id) => {
  try {
    const response = await axios.get(`/films/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération du film:', error);
    throw error;
  }
};

export const fetchSerieById = async (id) => {
  try {
    const response = await axios.get(`/series/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération de la série:', error);
    throw error;
  }
};