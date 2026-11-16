import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface FooterProps {
  onOpenLeasing: () => void;
  onOpenCMS: () => void;
}

export default function Footer({ onOpenLeasing, onOpenCMS }: FooterProps) {
  const { ref, isVisible } = useScrollReveal();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="w-full bg-black border-t border-white/10 text-white selection:bg-white selection:text-black overflow-hidden">
      <div 
        ref={ref}
        className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Top Architectural Dossier Request Banner */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 border-b border-white/10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <div className="max-w-xl">
            <div className="text-[11px] font-mono tracking-[0.3em] uppercase text-zinc-500 mb-3">
              Retailer Partnerships • Phase II Allocations
            </div>
            <h3 className="text-3xl sm:text-4xl font-display font-normal text-white tracking-tight leading-[1.1]">
              Inquire Regarding Maison Placement
            </h3>
            <p className="text-sm text-zinc-400 font-light mt-3 leading-relaxed">
              Double-height duplex and signature retail opportunities for international luxury fashion houses, fine watchmakers, and experiential concepts.
            </p>
          </div>

          {/* Minimal Inline Form with Accent CTA */}
          <div className="w-full lg:w-auto">
            {subscribed ? (
              <div className="text-sm font-mono text-[#ccff00] flex items-center gap-2">
                <span>✓</span>
                <span>Confidential dossier request received. Our leasing director will be in touch.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full sm:w-[420px]">
                <input
                  type="email"
                  required
                  placeholder="Official business email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-lg bg-zinc-950 border border-white/15 text-white placeholder-zinc-500 text-xs font-mono focus:outline-none focus:border-[#ccff00] transition-all"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg bg-[#ccff00] hover:bg-[#d8ff1a] text-black font-semibold text-xs tracking-wider uppercase transition-all whitespace-nowrap shadow-[0_0_20px_rgba(204,255,0,0.35)] active:scale-95"
                >
                  Request Dossier
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Monumental Brand Typography */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-20 pb-12">
        <div className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-medium tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent border-b border-white/10 pb-12 select-none">
          THE ARANYA PROMENADE
        </div>

        {/* 4 Clean Editorial Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-16 text-xs">
          
          {/* Col 1: Spatial Tiers */}
          <div className="space-y-3">
            <div className="text-[11px] font-mono tracking-widest uppercase text-zinc-500">
              Spatial Tiers
            </div>
            <ul className="space-y-2 text-zinc-400 font-light">
              <li className="hover:text-white transition-colors cursor-pointer">Tier 00 — The Living Ground (±0.00m)</li>
              <li className="hover:text-white transition-colors cursor-pointer">Tier 01 — The Glass Pavilion (+6.50m)</li>
              <li className="hover:text-white transition-colors cursor-pointer">Tier 02 — The Canopy Terraces (+13.00m)</li>
              <li className="hover:text-white transition-colors cursor-pointer">Tier 03 — The Oasis Skydeck (+19.50m)</li>
            </ul>
          </div>

          {/* Col 2: Notable Maisons */}
          <div className="space-y-3">
            <div className="text-[11px] font-mono tracking-widest uppercase text-zinc-500">
              Selected Ateliers
            </div>
            <ul className="space-y-2 text-zinc-400 font-light">
              <li>Bottega Veneta Duplex</li>
              <li>Sabyasachi Heritage Atelier</li>
              <li>Cartier & Rolex Salons</li>
              <li>Apple Glasshouse Sanctuary</li>
              <li>PVR Director’s Cut (Onyx LED)</li>
            </ul>
          </div>

          {/* Col 3: Operations & Curatorship */}
          <div className="space-y-3">
            <div className="text-[11px] font-mono tracking-widest uppercase text-zinc-500">
              Curatorship & Management
            </div>
            <ul className="space-y-2 text-zinc-400 font-light">
              <li>The Aranya Infrastructure Holdings</li>
              <li>LEED Platinum Certified Architecture</li>
              <li>GRIHA 5-Star Benchmark</li>
              <li>Net Zero Operational Target 2028</li>
              <li>
                <button
                  onClick={onOpenCMS}
                  className="text-zinc-300 hover:text-[#ccff00] transition-colors flex items-center gap-1 mt-1 font-mono text-[11px]"
                >
                  <span>CMS Studio Mode</span>
                  <ArrowUpRight size={12} />
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Location & Concierge */}
          <div className="space-y-3">
            <div className="text-[11px] font-mono tracking-widest uppercase text-zinc-500">
              Location & Access
            </div>
            <div className="text-zinc-400 font-light space-y-1.5 leading-relaxed">
              <p>Plot 42, Outer Ring Road – Whitefield Luxury Corridor, Bengaluru, Karnataka 560066</p>
              <p className="font-mono text-zinc-300 pt-1">Tel: +91 (080) 4920 8800</p>
              <p className="font-mono text-zinc-400">Hours: 10:00 — 23:30 IST</p>
              <p className="text-[11px] text-zinc-500 pt-1">• Porte-Cochère Gate 1<br />• Subterranean Valet Gate 3</p>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-zinc-500">
          <div>
            © {new Date().getFullYear()} The Aranya Promenade. All rights reserved. RERA Karnataka Reg: PRM/KA/RERA/1251/446/PR/190822/002812.
          </div>
          <div className="flex items-center gap-6 text-zinc-400">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Charter</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Tenancy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Security Protocol</span>
          </div>
        </div>

      </div>
    </div>
  </footer>
);
}
