import React, { useState } from 'react';
import Navbar from './components/common/Navbar';
import LiquidHeroCanvas from './components/3d/LiquidHeroCanvas';
import InteractiveMallMap3D from './components/3d/InteractiveMallMap3D';
import BiophilicAtriumShowcase from './components/biophilic/BiophilicAtriumShowcase';
import StoreDirectory from './components/directory/StoreDirectory';
import StoreDetailModal from './components/directory/StoreDetailModal';
import CMSManagerDrawer from './components/cms/CMSManagerDrawer';
import LeasingCalculatorModal from './components/leasing/LeasingCalculatorModal';
import Footer from './components/common/Footer';
import { INITIAL_STORES } from './data/initialStores';
import { Store } from './types';

export default function App() {
  const [stores, setStores] = useState<Store[]>(INITIAL_STORES);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [isCMSOpen, setIsCMSOpen] = useState<boolean>(false);
  const [isLeasingOpen, setIsLeasingOpen] = useState<boolean>(false);

  // Smooth scroll handler
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // CMS Handlers
  const handleAddStore = (newStore: Store) => {
    setStores((prev) => [newStore, ...prev]);
  };

  const handleUpdateStore = (updatedStore: Store) => {
    setStores((prev) => prev.map((s) => (s.id === updatedStore.id ? updatedStore : s)));
  };

  const handleDeleteStore = (id: string) => {
    setStores((prev) => prev.filter((s) => s.id !== id));
  };

  const handleResetDefaults = () => {
    setStores(INITIAL_STORES);
  };

  const handleLocateOnMap = (store: Store) => {
    setSelectedStore(store);
    handleScrollTo('mall-explorer');
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col selection:bg-white selection:text-black">
      
      {/* Top Navbar */}
      <Navbar
        onOpenCMS={() => setIsCMSOpen(true)}
        onOpenLeasing={() => setIsLeasingOpen(true)}
        onScrollTo={handleScrollTo}
        tenantCount={stores.length}
      />

      {/* Main Page Sections */}
      <main className="flex-1 w-full">
        {/* 1. 3D Liquid Displacement Interactive Hero Showcase */}
        <LiquidHeroCanvas
          onExploreClick={() => handleScrollTo('mall-explorer')}
          onLeasingClick={() => setIsLeasingOpen(true)}
        />

        {/* 2. 3D Interactive Spatial Mall Map Navigator */}
        <InteractiveMallMap3D
          stores={stores}
          onSelectStore={(store) => setSelectedStore(store)}
          selectedStore={selectedStore}
        />

        {/* 3. Sustainable Biophilic Architecture Showcase */}
        <BiophilicAtriumShowcase />

        {/* 4. Curated Luxury Store Directory & Search */}
        <StoreDirectory
          stores={stores}
          onSelectStore={(store) => setSelectedStore(store)}
          onLocateOnMap={handleLocateOnMap}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenLeasing={() => setIsLeasingOpen(true)}
        onOpenCMS={() => setIsCMSOpen(true)}
      />

      {/* Modals & Drawers */}
      <StoreDetailModal
        store={selectedStore}
        onClose={() => setSelectedStore(null)}
        onNavigateTo3D={handleLocateOnMap}
      />

      <CMSManagerDrawer
        isOpen={isCMSOpen}
        onClose={() => setIsCMSOpen(false)}
        stores={stores}
        onAddStore={handleAddStore}
        onUpdateStore={handleUpdateStore}
        onDeleteStore={handleDeleteStore}
        onResetDefaults={handleResetDefaults}
      />

      <LeasingCalculatorModal
        isOpen={isLeasingOpen}
        onClose={() => setIsLeasingOpen(false)}
      />
    </div>
  );
}

