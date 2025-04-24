
import React from 'react';
import CategoryItem from './CategoryItem';

const CategoryList = ({ categories, onDelete }) => {
  const handleDelete = (categoryId) => {
    if (onDelete) {
      onDelete(categoryId);
    }
  };

  return (
    <div className="category-list">
      {categories.map(category => (
        <CategoryItem 
          key={category.id} 
          category={category} 
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default CategoryList;