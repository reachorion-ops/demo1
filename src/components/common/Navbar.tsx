import React, { useState, useEffect } from 'react';
import { Building, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenCMS: () => void;
  onOpenLeasing: () => void;
  onScrollTo: (id: string) => void;
  tenantCount: number;
}

export default function Navbar({ onOpenCMS, onOpenLeasing, onScrollTo, tenantCount }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-3 sm:top-5 left-0 right-0 z-50 flex flex-col items-center pointer-events-none px-4 sm:px-6">
      
      {/* Floating Island Capsule Navbar (Gucci Inspiration with Razor-Sharp Visibility) */}
      <div 
        className={`pointer-events-auto w-full max-w-6xl rounded-full bg-white/98 backdrop-blur-3xl border border-black/15 transition-all duration-300 flex items-center justify-between select-none ${
          isScrolled 
            ? 'py-2.5 px-5 sm:px-7 shadow-[0_16px_45px_rgba(0,0,0,0.18),0_3px_10px_rgba(0,0,0,0.08)]' 
            : 'py-3 px-6 sm:px-8 shadow-[0_12px_36px_rgba(0,0,0,0.14),0_2px_6px_rgba(0,0,0,0.05)]'
        }`}
      >
        
        {/* Left Wing: High-Contrast, Bold & Crystal-Clear Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 xl:gap-9 flex-1 justify-start">
          <button
            onClick={() => onScrollTo('mall-explorer')}
            className="relative py-1 text-xs font-sans font-semibold tracking-[0.14em] uppercase text-black hover:text-black/75 transition-colors group flex items-center"
          >
            <span>Spatial Tiers</span>
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-black group-hover:w-full transition-all duration-300" />
          </button>

          <button
            onClick={() => onScrollTo('directory')}
            className="relative py-1 text-xs font-sans font-semibold tracking-[0.14em] uppercase text-black hover:text-black/75 transition-colors group flex items-center gap-2"
          >
            <span>Directory</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black text-white group-hover:bg-[#ccff00] group-hover:text-black transition-colors font-bold shadow-xs">
              {tenantCount}
            </span>
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-black group-hover:w-full transition-all duration-300" />
          </button>

          <button
            onClick={() => onScrollTo('architecture')}
            className="relative py-1 text-xs font-sans font-semibold tracking-[0.14em] uppercase text-black hover:text-black/75 transition-colors group flex items-center"
          >
            <span>Architecture</span>
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-black group-hover:w-full transition-all duration-300" />
          </button>
        </nav>

        {/* Center: Iconic Gucci-Style Symmetrical Monumental Wordmark */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="cursor-pointer group flex flex-col items-center justify-center text-center px-4"
        >
          <div className="flex items-center gap-2">
            <span className="text-[14px] sm:text-[17px] font-display font-semibold tracking-[0.22em] text-black group-hover:opacity-75 transition-opacity leading-tight whitespace-nowrap">
              THE ARANYA PROMENADE
            </span>
          </div>
          <div className="text-[9px] font-mono tracking-[0.32em] uppercase text-zinc-600 -mt-0.5 flex items-center gap-1.5 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] animate-pulse" />
            <span>BENGALURU</span>
          </div>
        </div>

        {/* Right Wing: High-Fashion Controls & CTAs */}
        <div className="flex items-center justify-end gap-2.5 sm:gap-3 flex-1">
          {/* CMS Studio Drawer Toggle */}
          <button
            onClick={onOpenCMS}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-100 hover:bg-zinc-200 text-black text-[11px] font-sans font-semibold uppercase tracking-wider border border-black/10 transition-all hover:border-black/25 group active:scale-95"
            title="Launch in-browser inventory CMS studio"
          >
            <Building size={13} className="text-black transition-colors" />
            <span>CMS Studio</span>
          </button>

          {/* Electric Volt Green Luxury Capsule CTA */}
          <button
            onClick={onOpenLeasing}
            className="px-4.5 sm:px-5 py-2 rounded-full bg-[#ccff00] hover:bg-[#d8ff1a] text-black font-bold text-[11px] sm:text-xs tracking-[0.14em] uppercase transition-all shadow-[0_0_20px_rgba(204,255,0,0.35)] hover:shadow-[0_0_30px_rgba(204,255,0,0.55)] active:scale-95 flex items-center gap-1.5 group"
          >
            <span>Leasing Inquiries</span>
            <ArrowUpRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="lg:hidden p-1.5 sm:p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 border border-black/10 text-black transition-colors"
          >
            {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>

      </div>

      {/* Floating Mobile Dropdown Card */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto lg:hidden w-full max-w-sm mt-2 rounded-3xl bg-white/95 backdrop-blur-2xl border border-black/10 p-5 shadow-2xl animate-scale-up space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-black/[0.08]">
            <div className="text-[9px] font-mono tracking-widest uppercase text-zinc-500">
              The Aranya Promenade
            </div>
            <div className="flex items-center gap-1.5 text-[9px] font-mono text-zinc-700">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] animate-pulse" />
              <span>Bengaluru GLA</span>
            </div>
          </div>

          <nav className="flex flex-col gap-2 text-xs font-mono uppercase tracking-[0.16em] text-zinc-800">
            <button
              onClick={() => { onScrollTo('mall-explorer'); setMobileMenuOpen(false); }}
              className="text-left py-2 hover:text-black flex items-center justify-between border-b border-black/[0.04]"
            >
              <span>Spatial Tiers</span>
              <span className="text-[10px] text-zinc-400">4 Tiers</span>
            </button>

            <button
              onClick={() => { onScrollTo('directory'); setMobileMenuOpen(false); }}
              className="text-left py-2 hover:text-black flex items-center justify-between border-b border-black/[0.04]"
            >
              <span>Curated Directory</span>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#ccff00] text-black font-semibold">
                {tenantCount} Maisons
              </span>
            </button>

            <button
              onClick={() => { onScrollTo('architecture'); setMobileMenuOpen(false); }}
              className="text-left py-2 hover:text-black flex items-center justify-between border-b border-black/[0.04]"
            >
              <span>Biophilic Architecture</span>
              <span className="text-[10px] text-zinc-400">Net Zero</span>
            </button>

            <button
              onClick={() => { onOpenLeasing(); setMobileMenuOpen(false); }}
              className="text-left py-2 hover:text-black flex items-center justify-between border-b border-black/[0.04]"
            >
              <span>Commercial Leasing Desk</span>
              <ArrowUpRight size={13} className="text-zinc-500" />
            </button>
          </nav>

          <div className="pt-1 flex flex-col gap-2">
            <button
              onClick={() => { onOpenLeasing(); setMobileMenuOpen(false); }}
              className="w-full py-2.5 rounded-full bg-[#ccff00] hover:bg-[#d8ff1a] text-black font-semibold text-xs tracking-wider uppercase text-center shadow-[0_0_15px_rgba(204,255,0,0.3)] active:scale-95 transition-all flex items-center justify-center gap-1.5"
            >
              <span>Commercial Leasing Dossier</span>
              <ArrowUpRight size={13} />
            </button>

            <button
              onClick={() => { onOpenCMS(); setMobileMenuOpen(false); }}
              className="w-full py-2 rounded-full bg-zinc-100 text-black text-xs font-mono flex items-center justify-center gap-2 border border-black/10 font-medium active:scale-95 transition-all"
            >
              <Building size={13} />
              <span>Launch CMS Studio</span>
            </button>
          </div>
        </div>
      )}

    </header>
  );
}
