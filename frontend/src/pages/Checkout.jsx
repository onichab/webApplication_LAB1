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
    if (!form.phone.trim()) nextErrors.phone = 'Phone number is required.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const order = {
      id: generateOrderId(),
      name: form.name.trim(),
      pickup: PICKUP_OPTIONS.find((p) => p.id === form.pickup),
      itemCount,
      subtotal
    };

    setConfirmedOrder(order);
    clearCart();
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
                onChange={updateField('phone')}
                placeholder="07X XXX XXXX"
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
              <div className="cart-summary__row" key={item.id}>
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>Rs. {(item.price * item.quantity).toLocaleString()}</span>
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
