import React, { useState, useRef } from 'react';
import { Store } from '../../types';
import { MALL_LEVELS } from '../../data/initialStores';
import { ArrowUpRight } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface InteractiveMallMap3DProps {
  stores: Store[];
  onSelectStore: (store: Store) => void;
  selectedStore: Store | null;
}

const FALLBACK_ARCHITECTURAL_IMG = 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1600&auto=format&fit=crop';

const LEVEL_ARCHITECTURAL_FACADES = [
  {
    shortCode: 'L0',
    name: 'The Living Ground',
    romanNumeral: 'Tier 00',
    elevation: '±0.00m',
    image: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?q=80&w=1600&auto=format&fit=crop',
    highlight: 'Double-Height Couture Duplexes & Preserved Ficus Courtyard',
    circulation: 'VIP Chauffeur Porte-Cochère & Granite Promenade',
    featuredTenants: ['Bottega Veneta', 'Sabyasachi Atelier', 'Cartier Maison', 'Rolex Ethos'],
  },
  {
    shortCode: 'L1',
    name: 'The Glass Pavilion',
    romanNumeral: 'Tier 01',
    elevation: '+6.50m',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1600&auto=format&fit=crop',
    highlight: 'Daylight Skylight Bridges & Spatial Design Laboratories',
    circulation: 'Suspended Glass Walkways & Acoustic Chambers',
    featuredTenants: ['Apple Glasshouse', 'Raw Mango', 'Dyson VR Lab', 'Rimowa Atelier'],
  },
  {
    shortCode: 'L2',
    name: 'The Canopy Terraces',
    romanNumeral: 'Tier 02',
    elevation: '+13.00m',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1600&auto=format&fit=crop',
    highlight: 'Open-Air Botanical Verandas & Curated Herb Gardens',
    circulation: 'Rooftop Water Fountain Promenades & Al Fresco Decks',
    featuredTenants: ['Trattoria Aranya', 'Baoshuan Sky Terrace', 'Blue Tokai Reserve'],
  },
  {
    shortCode: 'L3',
    name: 'The Oasis Skydeck',
    romanNumeral: 'Tier 03',
    elevation: '+19.50m',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1600&auto=format&fit=crop',
    highlight: 'Onyx Cinema LED Lounge & Hydrothermal Wellness Grottos',
    circulation: 'Private Member Elevators & Thermal Vitality Pool Deck',
    featuredTenants: ["PVR Director’s Cut", 'Six Senses Urban Spa'],
  },
];

export default function InteractiveMallMap3D({ stores, onSelectStore, selectedStore }: InteractiveMallMap3DProps) {
  const { ref, isVisible } = useScrollReveal();
  const [activeTierIndex, setActiveTierIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const activeFacade = LEVEL_ARCHITECTURAL_FACADES[activeTierIndex];
  const activeLevelInfo = MALL_LEVELS[activeTierIndex];
  const tierStores = stores.filter((s) => s.levelShort === activeFacade.shortCode);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      x: y * -12,
      y: x * 12,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <section id="mall-explorer" className="relative w-full py-28 bg-black border-t border-white/[0.08] overflow-hidden">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
      >

        {/* Editorial Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <div className="text-[11px] font-mono tracking-[0.25em] text-zinc-400 uppercase mb-3 flex items-center gap-2">
              <span className="w-6 h-[1px] bg-zinc-600" />
              <span>SPATIAL CURATION • FOUR ARCHITECTURAL TIERS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-normal text-white tracking-tight leading-[1.1]">
              Four Interconnected <br />
              <span className="bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent font-editorial italic font-normal">
                Spatial Environments
              </span>
            </h2>
          </div>

          <p className="max-w-md text-zinc-400 text-sm font-light leading-relaxed">
            Conceived not merely as commercial floors, but as four distinct architectural zones linked by natural daylight, botanical courtyards, and silent subterranean air circulation.
          </p>
        </div>

        {/* Tier Selector Bar with Bottega Volt Accent */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {LEVEL_ARCHITECTURAL_FACADES.map((tier, idx) => {
            const isActive = activeTierIndex === idx;
            return (
              <button
                key={tier.shortCode}
                onClick={() => setActiveTierIndex(idx)}
                className={`p-4 sm:p-5 rounded-xl border text-left transition-all relative overflow-hidden ${isActive
                    ? 'bg-zinc-900 border-[#ccff00]/60 text-white shadow-[0_0_20px_rgba(204,255,0,0.15)]'
                    : 'bg-black border-white/10 text-zinc-400 hover:border-white/30 hover:text-white'
                  }`}
              >
                <div className="flex items-center justify-between text-xs font-mono mb-1">
                  <span className={isActive ? 'text-[#ccff00] font-semibold' : 'text-zinc-400'}>{tier.romanNumeral}</span>
                  <span className="text-[10px] text-zinc-400">{tier.elevation}</span>
                </div>
                <div className="text-base sm:text-lg font-display text-white">
                  {tier.name}
                </div>
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#ccff00] shadow-[0_0_10px_#ccff00]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Centerpiece: Interactive 3D Perspective Architectural Showcase Plate */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* Main 3D Tilted Facade Showcase (8 cols) */}
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className="lg:col-span-8 relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl min-h-[500px] flex flex-col justify-end p-8 sm:p-12 cursor-pointer group bg-zinc-950"
          >
            {/* High-Resolution Architectural Photography with Smooth Fade Animation */}
            <img
              key={activeFacade.shortCode}
              src={activeFacade.image}
              alt={activeFacade.name}
              onError={(e) => {
                e.currentTarget.src = FALLBACK_ARCHITECTURAL_IMG;
              }}
              className="absolute inset-0 w-full h-full object-cover filter brightness-[0.70] contrast-[1.05] transition-all duration-700 ease-out group-hover:scale-105 animate-fade-in"
            />

            {/* Black Vignette Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/30" />

            {/* Top Inscription */}
            <div className="absolute top-8 left-8 right-8 flex items-center justify-between text-xs font-mono text-white/70">
              <span className="px-3 py-1 rounded-full bg-black/80 border border-[#ccff00]/40 text-xs font-mono text-zinc-200 backdrop-blur-md flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] animate-pulse" />
                <span>ELEVATION {activeFacade.elevation}</span>
              </span>
              <span className="hidden sm:inline tracking-wider uppercase text-[11px] text-zinc-300">
                {activeFacade.circulation}
              </span>
            </div>

            {/* Bottom Content Inscription */}
            <div className="relative z-10 max-w-xl">
              <div className="text-xs font-mono tracking-widest text-zinc-400 uppercase mb-1">
                {activeFacade.romanNumeral} • {activeLevelInfo.shortCode}
              </div>
              <h3 className="text-3xl sm:text-4xl font-display font-normal text-white">
                {activeFacade.name}
              </h3>
              <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed mt-2">
                {activeLevelInfo.description}
              </p>

              <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center gap-2.5">
                <span className="text-[11px] font-mono text-zinc-400 uppercase">Key Tenancies:</span>
                {activeFacade.featuredTenants.map((brand, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md bg-white/10 border border-white/10 text-xs text-white font-sans"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Side Panel: Tier Tenancies & Anchor (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-zinc-950 border border-white/10 shadow-xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Active Pavilions</div>
                  <div className="text-xl font-display text-white mt-0.5">{tierStores.length} Curated Ateliers</div>
                </div>
                <span className="px-2.5 py-1 rounded bg-zinc-900 text-[#ccff00] border border-[#ccff00]/30 text-[10px] font-mono font-medium">
                  {activeFacade.shortCode}
                </span>
              </div>

              {/* Scrollable Store Directory List for Active Tier */}
              <div className="mt-4 space-y-2 max-h-[340px] overflow-y-auto pr-1">
                {tierStores.map((store) => (
                  <div
                    key={store.id}
                    onClick={() => onSelectStore(store)}
                    className="p-3.5 rounded-lg bg-zinc-900/60 border border-white/5 hover:border-white/30 hover:bg-zinc-900 transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-sm font-medium text-white group-hover:text-white transition-colors">
                        {store.name}
                      </div>
                      <div className="text-[11px] text-zinc-400 font-mono mt-0.5">
                        {store.unitNumber} • {store.sqft.toLocaleString()} sq.ft
                      </div>
                    </div>

                    <ArrowUpRight size={14} className="text-zinc-500 group-hover:text-[#ccff00] transition-colors" />
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Anchor Feature */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Tier Anchor Feature</div>
              <div className="text-xs text-white mt-1 leading-snug font-editorial italic">
                {activeLevelInfo.anchorAttraction}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
