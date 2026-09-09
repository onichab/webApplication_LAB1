import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Icon } from '../utils/icons.jsx';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    
    const result = await register(username, password);
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
            <h2>Create an Account</h2>
            <p>Join UniSwap to start buying and selling</p>
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
            <div className="form-field">
              <label>Confirm Password</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            
            <button
              type="submit"
              className="btn btn--primary"
              disabled={loading}
              style={{ width: '100%', justifyContent: 'center', marginTop: '16px' }}
            >
              {loading ? 'Creating Account...' : 'Register'}
            </button>
            
            <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
              Already have an account? <Link to="/login" style={{ color: '#4FBFBF', fontWeight: 'bold' }}>Sign in here</Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
