
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import CategoryPage from './components/CategoryPage';
import AddCategory from './components/Add/AddCategory';
import AddFilm from './components/Add/AddFilm';
import AddSerie from './components/Add/AddSerie';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories/:id" element={<CategoryPage />} />
            <Route path="/add/category" element={<AddCategory />} />
            <Route path="/add/film" element={<AddFilm />} />
            <Route path="/add/serie" element={<AddSerie />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;