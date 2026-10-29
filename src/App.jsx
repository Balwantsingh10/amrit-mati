import React from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MarqueeBanner } from './components/MarqueeBanner';
import { CategoryNav } from './components/CategoryNav';
import { Bestsellers } from './components/Bestsellers';
import { WhyChooseUs } from './components/WhyChooseUs';
import { BrandVideoShowcase } from './components/BrandVideoShowcase';
import { StarterBundles } from './components/StarterBundles';
import { SourceToKitchenStory } from './components/SourceToKitchenStory';
import { CustomerReviews } from './components/CustomerReviews';
import { RecipesSection } from './components/RecipesSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { LabReportModal } from './components/LabReportModal';
import { SearchModal } from './components/SearchModal';
import { Toast } from './components/Toast';
import { CollectionPage } from './components/CollectionPage';
import { SourcingPage } from './components/SourcingPage';
import { QualityPage } from './components/QualityPage';

const MainContent = () => {
  const { activePage } = useCart();

  return (
    <main>
      {activePage === 'home' && (
        <>
          <Hero />
          <MarqueeBanner />
          <CategoryNav />
          <Bestsellers />
          <WhyChooseUs />
          <BrandVideoShowcase />
          <StarterBundles />
          <SourceToKitchenStory />
          <CustomerReviews />
          <RecipesSection />
          <FaqSection />
        </>
      )}

      {activePage === 'shop' && <CollectionPage />}
      {activePage === 'bundles' && (
        <div style={{ paddingTop: '1.5rem' }}>
          <StarterBundles />
        </div>
      )}
      {activePage === 'sourcing' && <SourcingPage />}
      {activePage === 'quality' && <QualityPage />}
      {activePage === 'recipes' && (
        <div style={{ paddingTop: '1.5rem' }}>
          <RecipesSection />
        </div>
      )}
    </main>
  );
};

export function App() {
  return (
    <CartProvider>
      <div className="app-root" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <AnnouncementBar />
        <Header />
        <div style={{ flex: 1 }}>
          <MainContent />
        </div>
        <Footer />

        {/* Global Drawers & Modals */}
        <CartDrawer />
        <ProductDetailModal />
        <CheckoutModal />
        <OrderTrackingModal />
        <LabReportModal />
        <SearchModal />
        <Toast />
      </div>
    </CartProvider>
  );
}

export default App;
