import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import CategoryGrid from '../components/CategoryGrid.jsx';
import BestSellers from '../components/BestSellers.jsx';
import MarketplacePreview from '../components/MarketplacePreview.jsx';
import Footer from '../components/Footer.jsx';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Failed to fetch products', err));
  }, []);

  return (
    <>
      <Navbar />
      <Hero products={products.length > 0 ? products : []} />
      <CategoryGrid onSelectCategory={(catName) => {
        setActiveCategory(catName);
        document.getElementById('marketplace')?.scrollIntoView({ behavior: 'smooth' });
      }} />
      <BestSellers />
      <MarketplacePreview activeFilter={activeCategory} setActiveFilter={setActiveCategory} products={products} />
      <Footer />
    </>
  );
}
