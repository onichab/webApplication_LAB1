import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../utils/icons.jsx';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { useCart } from '../context/CartContext.jsx';

const PICKUP_OPTIONS = [
  {
    id: 'campus',
    label: 'Campus Pickup',
    description: 'Collect the item at a designated campus pickup point.'
  },
  {
    id: 'meet',
    label: 'Meet the Seller',
    description: 'Arrange a time and place to meet the seller directly.'
  }
];

function generateOrderId() {
  return `UNI-${Math.floor(100000 + Math.random() * 900000)}`;
}

export default function Checkout() {
  const { items, itemCount, subtotal, clearCart } = useCart();

  const [form, setForm] = useState({
    name: '',
    studentId: '',
    phone: '',
    pickup: 'campus'
  });
  const [errors, setErrors] = useState({});
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  const updateField = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Name is required.';
    if (!form.studentId.trim()) nextErrors.studentId = 'Student ID is required.';
    
    if (!form.phone.trim()) {
      nextErrors.phone = 'Phone number is required.';
    } else if (!/^\d{10}$/.test(form.phone.trim())) {
      nextErrors.phone = 'Phone number must be exactly 10 digits.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await fetch('http://localhost:5000/api/products/buy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          items: items.map(i => ({ id: i.id, quantity: i.quantity })),
          buyerName: form.name.trim(),
          buyerPhone: form.phone.trim()
        })
      });

      if (!response.ok) {
        const errData = await response.json();
        alert(errData.error || 'Checkout failed due to insufficient stock.');
        return;
      }

      const order = {
        id: generateOrderId(),
        name: form.name.trim(),
        pickup: PICKUP_OPTIONS.find((p) => p.id === form.pickup),
        itemCount,
        subtotal,
        items: [...items]
      };

      setConfirmedOrder(order);
      clearCart();
    } catch (err) {
      alert('Network error during checkout');
    }
  };

  // ---- Order confirmed ----
  if (confirmedOrder) {
    return (
      <>
        <Navbar />
        <div className="order-confirmation">
          <div className="order-confirmation__icon">
            <Icon name="Star" size={32} fill="currentColor" />
          </div>
          <h1>Order Placed!</h1>
          <p>
            Thanks, {confirmedOrder.name.split(' ')[0]} — your order{' '}
            <strong>{confirmedOrder.id}</strong> has been placed.
          </p>

          <div className="order-confirmation__summary">
            <div className="cart-summary__row" style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '16px', marginBottom: '16px' }}>
              <strong>Seller Instructions</strong>
            </div>
            {confirmedOrder.items.map(item => (
              <div key={item.id} style={{ marginBottom: '12px', textAlign: 'left' }}>
                <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{item.name} (x{item.quantity})</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                  Contact: {item.contact_number || 'N/A'} • Room: {item.room_number || 'N/A'}
                </div>
              </div>
            ))}
          </div>

          <div className="order-confirmation__summary" style={{ marginTop: '24px' }}>
            <div className="cart-summary__row">
              <span>Items</span>
              <span>{confirmedOrder.itemCount}</span>
            </div>
            <div className="cart-summary__row">
              <span>Total</span>
              <span>Rs. {confirmedOrder.subtotal.toLocaleString()}</span>
            </div>
            <div className="cart-summary__row">
              <span>Pickup</span>
              <span>{confirmedOrder.pickup.label}</span>
            </div>
          </div>

          <p className="order-confirmation__note">
            {confirmedOrder.pickup.description} No payment has been collected — this is
            an MVP checkout flow.
          </p>

          <Link to="/" className="btn btn--primary">
            Back to Home
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  // ---- Empty cart guard ----
  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <div className="coming-soon">
          <h1>Nothing to check out</h1>
          <p>Your cart is empty — add an item before checking out.</p>
          <Link to="/#marketplace" className="btn btn--primary">
            Explore Marketplace
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  // ---- Checkout form ----
  return (
    <>
      <Navbar />
      <div className="checkout-page">
        <div className="section__header">
          <h2>Checkout</h2>
          <p>Confirm your details and pickup preference.</p>
        </div>

        <form className="checkout-layout" onSubmit={handlePlaceOrder} noValidate>
          <div className="checkout-form">
            <div className="form-field">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={updateField('name')}
                placeholder="Your full name"
              />
              {errors.name && <span className="form-error">{errors.name}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="studentId">Student ID</label>
              <input
                id="studentId"
                type="text"
                value={form.studentId}
                onChange={updateField('studentId')}
                placeholder="e.g. TC-2023-0451"
              />
              {errors.studentId && <span className="form-error">{errors.studentId}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                type="tel"
                value={form.phone}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '');
                  if (val.length <= 10) setForm((f) => ({ ...f, phone: val }));
                }}
                placeholder="07X XXX XXXX"
                maxLength={10}
              />
              {errors.phone && <span className="form-error">{errors.phone}</span>}
            </div>

            <div className="form-field">
              <label>Pickup Option</label>
              <div className="pickup-options">
                {PICKUP_OPTIONS.map((option) => (
                  <label
                    key={option.id}
                    className={`pickup-option${
                      form.pickup === option.id ? ' pickup-option--active' : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name="pickup"
                      value={option.id}
                      checked={form.pickup === option.id}
                      onChange={updateField('pickup')}
                    />
                    <span className="pickup-option__label">{option.label}</span>
                    <span className="pickup-option__desc">{option.description}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <aside className="cart-summary">
            <h3>Order Summary</h3>
            {items.map((item) => (
              <div key={item.id} style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '12px' }}>
                <div className="cart-summary__row" style={{ marginBottom: 0 }}>
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>Rs. {(item.price * item.quantity).toLocaleString()}</span>
                </div>
                {(item.room_number || item.contact_number) && (
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-primary)' }}>
                    Seller: {item.contact_number || 'N/A'} • {item.room_number || 'N/A'}
                  </span>
                )}
              </div>
            ))}
            <div className="cart-summary__row cart-summary__row--total">
              <span>Total</span>
              <span>Rs. {subtotal.toLocaleString()}</span>
            </div>
            <button type="submit" className="btn btn--primary cart-summary__checkout">
              Place Order
            </button>
          </aside>
        </form>
      </div>
      <Footer />
    </>
  );
}
