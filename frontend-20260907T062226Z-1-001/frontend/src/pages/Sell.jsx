import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { categories } from '../data/categories';
import { Icon } from '../utils/icons.jsx';

export default function Sell() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    category: categories[0].name,
    price: '',
    condition: 'Good',
    universityId: '',
    roomNumber: '',
    contactNumber: '',
    image: '',
    description: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="coming-soon">
          <h1>Sign in Required</h1>
          <p>You must be logged in to sell items.</p>
          <button 
            onClick={() => navigate('/login')}
            className="btn btn--primary"
          >
            Go to Login
          </button>
        </div>
        <Footer />
      </>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.image) {
      setError('Please upload a photo of the item.');
      setLoading(false);
      return;
    }

    if (!formData.contactNumber || !/^\d{10}$/.test(formData.contactNumber)) {
      setError('Contact number is required and must be exactly 10 digits.');
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const categoryIconMap = categories.reduce((acc, cat) => {
        acc[cat.name] = cat.icon;
        return acc;
      }, {});
      
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        icon: categoryIconMap[formData.category] || 'Package'
      };

      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        navigate(`/products/${data.productId}`);
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to create listing');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="checkout-page">
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div className="section__header">
            <h2>List an Item for Sale</h2>
            <p>Add details about the item you want to sell.</p>
          </div>
          
          <form className="checkout-form" onSubmit={handleSubmit}>
            {error && <div className="form-error" style={{ background: '#FCE8EC', padding: '10px', borderRadius: 'var(--radius-sm)' }}>{error}</div>}

            <div className="form-field">
              <label>Item Title</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Engineering Mathematics Textbook"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="form-field">
                <label>Price (LKR)</label>
                <input
                  type="number"
                  name="price"
                  required
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g., 2500"
                />
              </div>
              
              <div className="form-field">
                <label>Condition</label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                >
                  <option value="New">New</option>
                  <option value="Like New">Like New</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                </select>
              </div>
            </div>

            <div className="form-field">
              <label>Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label>University ID</label>
              <input
                type="text"
                name="universityId"
                required
                value={formData.universityId}
                onChange={handleChange}
                placeholder="e.g., ST123456"
              />
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="form-field">
                <label>Room Number</label>
                <input
                  type="text"
                  name="roomNumber"
                  value={formData.roomNumber}
                  onChange={handleChange}
                  placeholder="e.g., Block A - 204"
                />
              </div>
              <div className="form-field">
                <label>Contact Number</label>
                <input 
                  type="tel" 
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '');
                    if (val.length <= 10) setFormData({ ...formData, contactNumber: val });
                  }}
                  placeholder="e.g., 071 234 5678"
                  maxLength={10}
                />
              </div>
            </div>

            <div className="form-field">
              <label>Photo</label>
              <div 
                style={{
                  border: '2px dashed var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '30px',
                  textAlign: 'center',
                  background: 'var(--color-bg)',
                  cursor: 'pointer',
                  position: 'relative'
                }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files[0];
                  if (file && file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onloadend = () => setFormData(prev => ({ ...prev, image: reader.result }));
                    reader.readAsDataURL(file);
                  }
                }}
                onClick={() => document.getElementById('fileUpload').click()}
              >
                {formData.image && formData.image.startsWith('data:image') ? (
                  <img src={formData.image} alt="Preview" style={{ maxHeight: '150px', borderRadius: '4px' }} />
                ) : formData.image ? (
                  <img src={formData.image} alt="Preview" style={{ maxHeight: '150px', borderRadius: '4px' }} />
                ) : (
                  <>
                    <Icon name="UploadCloud" size={32} style={{ color: 'var(--color-text-muted)', marginBottom: '8px' }} />
                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Drag & Drop an image here, or click to select</p>
                  </>
                )}
                <input 
                  id="fileUpload" 
                  type="file" 
                  accept="image/*" 
                  style={{ display: 'none' }} 
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => setFormData(prev => ({ ...prev, image: reader.result }));
                      reader.readAsDataURL(file);
                    }
                  }} 
                />
              </div>
            </div>

            <div className="form-field">
              <label>Description</label>
              <textarea
                name="description"
                rows="5"
                required
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the item, any flaws, and what's included..."
              ></textarea>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
              <button
                type="submit"
                className="btn btn--primary"
                disabled={loading}
              >
                {loading ? 'Creating Listing...' : 'List Item Now'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
