import React, { useState } from 'react';
import { X, Calculator, CheckCircle2, Send, Building2, TrendingUp, Sun, Users } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LeasingCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SPACE_OPTIONS = [
  { label: 'Artisanal Island Kiosk', sqft: 250, footfallMultiplier: 1.1, baseRentRange: '₹3.5L — ₹5.0L /mo' },
  { label: 'Boutique Atelier', sqft: 1200, footfallMultiplier: 1.4, baseRentRange: '₹9.0L — ₹14.0L /mo' },
  { label: 'Signature Pavilion', sqft: 2800, footfallMultiplier: 1.9, baseRentRange: '₹18.0L — ₹26.0L /mo' },
  { label: 'Flagship Duplex (Corner)', sqft: 5500, footfallMultiplier: 2.8, baseRentRange: '₹38.0L — ₹55.0L /mo' },
  { label: 'Anchor Grand Maison', sqft: 12000, footfallMultiplier: 4.2, baseRentRange: 'Custom Term' },
];

export default function LeasingCalculatorModal({ isOpen, onClose }: LeasingCalculatorModalProps) {
  const [selectedSpaceIndex, setSelectedSpaceIndex] = useState(2);
  const [preferredLevel, setPreferredLevel] = useState<string>('Tier 00 — The Living Ground');
  const [brandName, setBrandName] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const currentSpace = SPACE_OPTIONS[selectedSpaceIndex];
  const estimatedWeeklyFootfall = Math.round(145000 * (currentSpace.footfallMultiplier / 2.0));
  const estimatedDwellTime = '148 minutes';
  const solarEnergySavings = Math.round(currentSpace.sqft * 42);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#ccff00', '#ffffff', '#222222', '#d4ff00'],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-black border border-white/15 rounded-2xl overflow-hidden shadow-2xl my-auto animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center text-white">
              <Calculator size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase">TENANT ACQUISITION</span>
                <span className="text-[10px] font-mono bg-zinc-900 text-white border border-white/15 px-2 py-0.5 rounded">
                  BENGALURU PRIME GLA
                </span>
              </div>
              <h2 className="text-2xl font-display text-white">Retailer Leasing & Space ROI Estimator</h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8 bg-black">
          
          {/* Space Footprint Selector */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-3">
              1. Select Desired Retail Footprint
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
              {SPACE_OPTIONS.map((opt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedSpaceIndex(idx)}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    selectedSpaceIndex === idx
                      ? 'bg-zinc-900 border-[#ccff00] text-white shadow-[0_0_15px_rgba(204,255,0,0.15)]'
                      : 'bg-black border-white/10 text-zinc-400 hover:border-white/30 hover:text-white'
                  }`}
                >
                  <div className="text-base font-bold text-white font-mono">{opt.sqft.toLocaleString()} <span className="text-xs font-normal text-[#ccff00]">sq.ft</span></div>
                  <div className="text-xs font-medium mt-1 truncate text-white">{opt.label}</div>
                  <div className="text-[10px] text-zinc-400 font-mono mt-2">{opt.baseRentRange}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Level Preference */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
              2. Preferred Architectural Tier
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {[
                { title: 'Tier 00 — The Living Ground', tag: 'Couture Duplexes & Atrium' },
                { title: 'Tier 01 — The Glass Pavilion', tag: 'High Watches & Design Tech' },
                { title: 'Tier 02 — The Canopy Terraces', tag: 'Al Fresco Fine Gastronomy' },
                { title: 'Tier 03 — The Oasis Skydeck', tag: 'IMAX Cinema & Holistic Spa' },
              ].map((lvl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setPreferredLevel(lvl.title)}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    preferredLevel.includes(`Tier 0${idx}`)
                      ? 'bg-zinc-900 border-[#ccff00] text-white shadow-md'
                      : 'bg-black border-white/10 text-zinc-400 hover:border-white/30 hover:text-white'
                  }`}
                >
                  <div className="text-xs font-medium text-white">{lvl.title}</div>
                  <div className="text-[10px] text-zinc-400 mt-0.5">{lvl.tag}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Telemetry Projections */}
          <div className="p-5 rounded-xl bg-zinc-950 border border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center text-white">
                <Users size={18} />
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase text-zinc-400">Weekly Target Footfall</div>
                <div className="text-xl font-display text-white">{estimatedWeeklyFootfall.toLocaleString()}+</div>
                <div className="text-[10px] text-[#ccff00] font-mono">High-Net-Worth Profile</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center text-white">
                <TrendingUp size={18} />
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase text-zinc-400">Average Dwell Time</div>
                <div className="text-xl font-display text-white">{estimatedDwellTime}</div>
                <div className="text-[10px] text-[#ccff00] font-mono">+115% vs Conventional Malls</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center text-white">
                <Sun size={18} />
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase text-zinc-400">Solar Energy Offset</div>
                <div className="text-xl font-display text-white">{(solarEnergySavings).toLocaleString()} kWh/yr</div>
                <div className="text-[10px] text-[#ccff00] font-mono">Subsidized Microgrid</div>
              </div>
            </div>
          </div>

          {/* Submission Form */}
          {submitted ? (
            <div className="p-6 rounded-xl bg-zinc-950 border border-white/20 text-center space-y-3">
              <CheckCircle2 size={36} className="mx-auto text-white" />
              <h3 className="text-xl font-display text-white">Leasing Proposal Successfully Logged</h3>
              <p className="text-xs text-zinc-300 max-w-md mx-auto leading-relaxed font-light">
                Thank you, {contactName || 'Valued Brand Partner'}. The Chief Leasing Director for <strong className="text-white">{brandName || 'your brand'}</strong> will deliver the spatial dossier and CAD drawings within 2 business hours.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-mono"
                >
                  Configure Another Space
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-mono">
              <div className="text-xs uppercase tracking-widest text-zinc-400">
                3. Retailer Details for Dossier Delivery
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-zinc-400 mb-1">Maison / Brand Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Balenciaga or Tiffany & Co."
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-zinc-950 border border-white/15 text-white placeholder-zinc-500 focus:outline-none focus:border-white"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1">Authorized Contact Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikramaditya Singhania"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-zinc-950 border border-white/15 text-white placeholder-zinc-500 focus:outline-none focus:border-white"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1">Official Business Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="director@brand.com"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-zinc-950 border border-white/15 text-white placeholder-zinc-500 focus:outline-none focus:border-white"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1">Direct Mobile (+91) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-zinc-950 border border-white/15 text-white placeholder-zinc-500 focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-zinc-500">
                  Strictly confidential • Direct developer leasing desk
                </span>
                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-lg bg-[#ccff00] hover:bg-[#d8ff1a] text-black font-semibold text-xs tracking-wider uppercase transition-all shadow-[0_0_25px_rgba(204,255,0,0.35)] flex items-center gap-2 active:scale-95"
                >
                  <Send size={14} />
                  <span>Request Official Leasing Dossier</span>
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
