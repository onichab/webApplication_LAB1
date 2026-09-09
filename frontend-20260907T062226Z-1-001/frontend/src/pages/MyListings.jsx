import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { Icon } from '../utils/icons';

export default function MyListings() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => {
        // Filter products where the seller is the current user
        const userProducts = data.filter(p => p.seller_id === user.id);
        setProducts(userProducts);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [user, navigate]);

  if (!user) return null;

  return (
    <>
      <Navbar />
      <div className="section" style={{ minHeight: '60vh' }}>
        <div className="section__header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2>My Listings</h2>
            <p>Manage all the items you are currently selling on UniSwap.</p>
          </div>
          <Link to="/sell" className="btn btn--primary">
            <Icon name="Plus" size={18} />
            List New Item
          </Link>
        </div>

        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--color-text-muted)' }}>Loading your listings...</div>
        ) : products.length > 0 ? (
          <div className="product-grid">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)' }}>
            <Icon name="Package" size={48} style={{ color: 'var(--color-text-muted)', marginBottom: '16px' }} />
            <h3>No Active Listings</h3>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '24px' }}>You aren't selling anything yet. List an item to get started!</p>
            <Link to="/sell" className="btn btn--secondary">Start Selling</Link>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
