import { Link } from 'react-router-dom';
import { Icon } from '../utils/icons.jsx';
import { useCart } from '../context/CartContext.jsx';

const NAV_LINKS = [
  { label: 'Home', href: '#top' },
  { label: 'Categories', href: '#categories' },
  { label: 'Marketplace', href: '#marketplace' },
  { label: 'Best Sellers', href: '#best-sellers' },
  { label: 'Sell', href: '/sell' }
];

export default function Navbar() {
  const { itemCount } = useCart();

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
        </nav>

        <div className="navbar__actions">
          <button className="icon-btn" aria-label="Search">
            <Icon name="Search" size={20} />
          </button>
          <Link to="/cart" className="icon-btn icon-btn--cart" aria-label="Cart">
            <Icon name="ShoppingCart" size={20} />
            {itemCount > 0 && <span className="icon-btn__badge">{itemCount}</span>}
          </Link>
          <button className="icon-btn icon-btn--profile" aria-label="Profile">
            <Icon name="User" size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
