import { Link } from 'react-router-dom';
import { Icon } from '../utils/icons.jsx';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { useCart } from '../context/CartContext.jsx';

export default function Cart() {
  const { items, removeFromCart, increaseQty, decreaseQty, itemCount, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <div className="coming-soon">
          <h1>Your cart is empty</h1>
          <p>Browse the marketplace and add something useful.</p>
          <Link to="/#marketplace" className="btn btn--primary">
            Explore Marketplace
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="cart-page">
        <div className="section__header">
          <h2>Your Cart</h2>
          <p>{itemCount} item{itemCount !== 1 ? 's' : ''} ready to check out.</p>
        </div>

        <div className="cart-layout">
          <div className="cart-items">
            {items.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item__image">
                  <Icon name={item.icon} size={30} strokeWidth={1.5} />
                </div>

                <div className="cart-item__info">
                  <Link to={`/products/${item.id}`} className="cart-item__name">
                    {item.name}
                  </Link>
                  <span className="cart-item__meta">
                    {item.seller} • {item.condition}
                  </span>
                  <span className="cart-item__price">
                    Rs. {item.price.toLocaleString()}
                  </span>
                </div>

                <div className="cart-item__qty">
                  <button
                    className="qty-btn"
                    aria-label="Decrease quantity"
                    onClick={() => decreaseQty(item.id)}
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="qty-btn"
                    aria-label="Increase quantity"
                    onClick={() => increaseQty(item.id)}
                    disabled={item.quantity >= item.stock}
                  >
                    +
                  </button>
                </div>

                <div className="cart-item__line-total">
                  Rs. {(item.price * item.quantity).toLocaleString()}
                </div>

                <button
                  className="cart-item__remove"
                  aria-label="Remove item"
                  onClick={() => removeFromCart(item.id)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <aside className="cart-summary">
            <h3>Order Summary</h3>
            <div className="cart-summary__row">
              <span>Items ({itemCount})</span>
              <span>Rs. {subtotal.toLocaleString()}</span>
            </div>
            <div className="cart-summary__row cart-summary__row--total">
              <span>Total</span>
              <span>Rs. {subtotal.toLocaleString()}</span>
            </div>
            <Link to="/checkout" className="btn btn--primary cart-summary__checkout">
              Proceed to Checkout
            </Link>
          </aside>
        </div>
      </div>
      <Footer />
    </>
  );
}
