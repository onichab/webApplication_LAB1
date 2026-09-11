import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Icon } from '../utils/icons.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';

const NAV_LINKS = [
  { label: 'Home', href: '/#top' },
  { label: 'Categories', href: '/#categories' },
  { label: 'Marketplace', href: '/#marketplace' },
  { label: 'Best Sellers', href: '/#best-sellers' },
  { label: 'Sell', href: '/sell' }
];

export default function Navbar() {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const itemCount = cart ? cart.reduce((total, item) => total + item.quantity, 0) : 0;
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    if (user) {
      fetch('http://localhost:5000/api/products/notifications', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setNotificationCount(data.length);
      })
      .catch(console.error);
    }
  }, [user]);

  const handleSearchClick = () => {
    if (window.location.pathname !== '/') {
      window.location.href = '/#marketplace';
      setTimeout(() => {
        document.getElementById('marketplace-search')?.focus();
      }, 500);
    } else {
      document.getElementById('marketplace')?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        document.getElementById('marketplace-search')?.focus();
      }, 500);
    }
  };

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <a href="#top" className="navbar__logo">
          Uni<span>Swap</span>
        </a>

        <nav className="navbar__links">
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href} className="navbar__link">
              {link.label}
            </a>
          ))}
          {user && (
            <Link to="/my-listings" className="navbar__link" style={{ fontWeight: '600', color: 'var(--color-primary)' }}>
              My Listings
            </Link>
          )}
        </nav>

        <div className="navbar__actions">
          <button className="icon-btn" aria-label="Toggle Theme" onClick={toggleTheme}>
            <Icon name={theme === 'light' ? 'Moon' : 'Sun'} size={20} />
          </button>
          <button className="icon-btn" aria-label="Search" onClick={handleSearchClick}>
            <Icon name="Search" size={20} />
          </button>
          <Link to="/cart" className="icon-btn icon-btn--cart" aria-label="Cart">
            <Icon name="ShoppingCart" size={20} />
            {itemCount > 0 && <span className="icon-btn__badge">{itemCount}</span>}
          </Link>
          {user && (
            <Link to="/my-listings" className="icon-btn icon-btn--cart" aria-label="Notifications">
              <Icon name="Bell" size={20} />
              {notificationCount > 0 && <span className="icon-btn__badge" style={{ background: '#E0708C' }}>{notificationCount}</span>}
            </Link>
          )}
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginLeft: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '35px', height: '35px', borderRadius: '50%', background: 'var(--color-lavender-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6C5FBF' }}>
                  <Icon name="User" size={18} />
                </div>
                <span style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--color-text)' }}>{user.username}</span>
              </div>
              <button 
                onClick={logout} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px', 
                  fontSize: '0.85rem', 
                  background: '#FCE8EC', 
                  color: '#D92D20', 
                  border: 'none',
                  borderRadius: '999px', 
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = '#FAD4D8'}
                onMouseOut={(e) => e.currentTarget.style.background = '#FCE8EC'}
              >
                <Icon name="LogOut" size={14} />
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="icon-btn icon-btn--profile" aria-label="Profile">
              <Icon name="User" size={20} />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
