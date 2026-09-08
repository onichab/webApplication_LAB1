import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import CategoryGrid from '../components/CategoryGrid.jsx';
import BestSellers from '../components/BestSellers.jsx';
import MarketplacePreview from '../components/MarketplacePreview.jsx';
import Footer from '../components/Footer.jsx';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <CategoryGrid />
      <BestSellers />
      <MarketplacePreview />
      <Footer />
    </>
  );
}
