import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Icon } from '../utils/icons.jsx';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    const result = await login(username, password);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="checkout-page">
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
          <div className="section__header" style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
               <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--color-lavender-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6C5FBF' }}>
                 <Icon name="User" size={24} />
               </div>
            </div>
            <h2>Welcome Back</h2>
            <p>Sign in to your UniSwap account</p>
          </div>
          
          <form className="checkout-form" onSubmit={handleSubmit}>
            {error && <div className="form-error" style={{ textAlign: 'center', background: '#FCE8EC', padding: '10px', borderRadius: 'var(--radius-sm)' }}>{error}</div>}
            
            <div className="form-field">
              <label>Username</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-field">
              <label>Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <button
              type="submit"
              className="btn btn--primary"
              disabled={loading}
              style={{ width: '100%', justifyContent: 'center', marginTop: '16px' }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
            
            <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
              Don't have an account? <Link to="/register" style={{ color: '#4FBFBF', fontWeight: 'bold' }}>Register here</Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
