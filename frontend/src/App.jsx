import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import ComingSoon from './pages/ComingSoon.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />

      {/* Stubbed so nav/CTA links don't 404 — real pages arrive in later stages */}
      <Route
        path="/sell"
        element={<ComingSoon title="Sell an Item" stageNote="Coming in Stage 6." />}
      />
    </Routes>
  );
}
