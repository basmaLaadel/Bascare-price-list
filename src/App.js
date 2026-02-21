import React, { useState } from 'react';
import Header from './components/Header';
import Navbar from './components/Navbar';
import ProductGrid from './components/ProductGrid';
import './index.css';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="app">
      <Header />
      <Navbar
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <main className="main-content">
        <ProductGrid selectedCategory={selectedCategory} />
      </main>
      <footer className="footer">
        <p>&copy; 2026 Bascare. All rights reserved. | Made with ❤️ by Bascare Team</p>
      </footer>
    </div>
  );
}

export default App;
