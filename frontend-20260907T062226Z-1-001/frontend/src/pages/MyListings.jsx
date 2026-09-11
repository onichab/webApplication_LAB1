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
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    Promise.all([
      fetch('http://localhost:5000/api/products').then(res => res.json()),
      fetch('http://localhost:5000/api/products/notifications', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      }).then(res => res.json())
    ])
    .then(([productsData, notifsData]) => {
      const userProducts = productsData.filter(p => p.seller_id === user.id);
      setProducts(userProducts);
      if (Array.isArray(notifsData)) {
        setNotifications(notifsData);
      }
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
        <div className="section__header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2>My Listings Dashboard</h2>
            <p>Manage your items and view recent orders.</p>
          </div>
          <Link to="/sell" className="btn btn--primary">
            <Icon name="Plus" size={18} />
            List New Item
          </Link>
        </div>

        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--color-text-muted)' }}>Loading your dashboard...</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {notifications.length > 0 && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                    <Icon name="Bell" size={20} style={{ color: 'var(--color-primary)' }} /> 
                    Recent Orders
                  </h3>
                  <button 
                    onClick={() => {
                      if (confirm('Clear all recent orders?')) {
                        fetch('http://localhost:5000/api/products/notifications', {
                          method: 'DELETE',
                          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                        }).then(() => {
                          setNotifications([]);
                          window.location.reload();
                        });
                      }
                    }}
                    className="btn btn--secondary"
                    style={{ padding: '6px 12px', fontSize: '0.85rem' }}
                  >
                    Clear All
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {notifications.map(notif => (
                    <div key={notif.id} style={{ padding: '16px', background: 'var(--color-surface)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--color-primary)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <p style={{ margin: 0, fontWeight: '500' }}>{notif.message}</p>
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                        {new Date(notif.created_at).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div>
              <h3 style={{ marginBottom: '16px' }}>My Active Items</h3>
              {products.length > 0 ? (
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
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
