import React, { useState } from 'react';
import { Droplets, Wind, Sun, Leaf, Award } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const FALLBACK_BIOPHILIC_IMG = 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1200&auto=format&fit=crop';

const ARCHITECTURAL_PILLARS = [
  {
    id: 'canopy',
    title: 'The 65m Living Bio-Canopy',
    subtitle: 'Passive Botanical Air Purification',
    icon: Leaf,
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop',
    stats: '-4.2°C Natural Cooling • 40,000+ Native Flora',
    description: 'An unbroken vertical botanical spine threading across all four levels. Preserved 80-year-old Indian Ficus trees and rare epiphytic ferns naturally regulate ambient humidity and filter particulates, creating an indoor sanctuary of pure oxygen.',
  },
  {
    id: 'rainwater',
    title: 'Kinetic Rainwater Chandeliers',
    subtitle: 'Harvesting Bengaluru’s Monsoon Waters',
    icon: Droplets,
    image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1200&auto=format&fit=crop',
    stats: '1.2M Litres Captured Annually • Zero Waste',
    description: 'Suspended bronze sculptural spirals funnel monsoon precipitation directly from the daylight glass roof into reflecting pools and subterranean botanical irrigation reserves, achieving 100% water neutrality.',
  },
  {
    id: 'daylight',
    title: 'Dynamic Photovoltaic Glass Dome',
    subtitle: 'Smart Solar Glazing & Diffused Luminance',
    icon: Sun,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
    stats: '88% Solar Heat Rejection • 1.4MW Clean Energy',
    description: 'A double-curved hexagonal glass dome embedded with transparent photovoltaic cells. It powers common promenades while modulating natural daylight to eliminate glare across retail storefronts.',
  },
  {
    id: 'microclimate',
    title: 'Subterranean Geo-Thermal Earth Tubes',
    subtitle: 'Silent, Low-Energy Thermal Comfort',
    icon: Wind,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    stats: '62% Less HVAC Energy • Acoustic Silence',
    description: 'Fresh ambient air is pre-cooled through a 300-meter network of subterranean earth tubes deep in Bengaluru’s granite bed before entering the mall, ensuring acoustic calm and unparalleled energy efficiency.',
  },
];

export default function BiophilicAtriumShowcase() {
  const { ref, isVisible } = useScrollReveal();
  const [activePillarIndex, setActivePillarIndex] = useState(0);
  const activePillar = ARCHITECTURAL_PILLARS[activePillarIndex];

  return (
    <section id="architecture" className="relative w-full py-28 bg-black border-t border-white/[0.08] overflow-hidden">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
      >

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <div className="text-[11px] font-mono tracking-[0.25em] text-zinc-400 uppercase mb-3 flex items-center gap-2">
              <span className="w-6 h-[1px] bg-zinc-600" />
              <span>PASSIVE BIOPHILIC ENGINEERING</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-normal text-white tracking-tight leading-[1.1]">
              Atrium Ecology & <br />
              <span className="bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent font-editorial italic font-normal">
                Climate Discipline
              </span>
            </h2>
          </div>

          <p className="max-w-md text-zinc-400 text-sm font-light leading-relaxed">
            Engineered specifically for Bengaluru’s highland climate. Passive geo-thermal cooling, photovoltaic glazing, and 40,000+ native plants achieve operational net-zero equilibrium.
          </p>
        </div>

        {/* Pillar Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Navigation Pillar Buttons (Left) */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {ARCHITECTURAL_PILLARS.map((p, idx) => {
              const Icon = p.icon;
              const isActive = activePillarIndex === idx;
              return (
                <button
                  key={p.id}
                  onClick={() => setActivePillarIndex(idx)}
                  className={`p-5 rounded-xl border text-left transition-all flex items-start gap-4 ${isActive
                      ? 'bg-zinc-900 border-[#ccff00]/60 text-white shadow-[0_0_20px_rgba(204,255,0,0.12)]'
                      : 'bg-black border-white/10 text-zinc-400 hover:border-white/20 hover:bg-zinc-950'
                    }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${isActive ? 'bg-[#ccff00] text-black shadow-[0_0_12px_rgba(204,255,0,0.35)]' : 'bg-zinc-900 text-zinc-400'
                    }`}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <h3 className="text-base font-display text-white">
                      {p.title}
                    </h3>
                    <div className="text-xs text-zinc-400 font-mono mt-0.5">{p.subtitle}</div>
                    <div className={`text-[11px] font-mono mt-2 ${isActive ? 'text-[#ccff00]' : 'text-zinc-300'}`}>{p.stats}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Pillar Showcase Plate (Right) */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl h-[520px] flex flex-col justify-end p-8 sm:p-12 bg-zinc-950">
              <img
                key={activePillar.id}
                src={activePillar.image}
                alt={activePillar.title}
                onError={(e) => {
                  e.currentTarget.src = FALLBACK_BIOPHILIC_IMG;
                }}
                className="absolute inset-0 w-full h-full object-cover filter brightness-[0.65] contrast-[1.05] transition-all duration-700 animate-fade-in"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

              <div className="relative z-10">
                <div className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-1">
                  Architectural Principle
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-normal text-white">
                  {activePillar.title}
                </h3>
                <p className="text-sm sm:text-base text-zinc-300 mt-2 font-light leading-relaxed max-w-xl">
                  {activePillar.description}
                </p>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400">
                  <div>
                    {activePillar.stats}
                  </div>
                  <div>
                    Net Zero Target 2028
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
