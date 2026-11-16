import React, { useState } from 'react';
import { Store } from '../../types';
import { X, MapPin, Clock, Phone, Sparkles, CheckCircle2, Calendar, Compass, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

const FALLBACK_STORE_IMG = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop';

interface StoreDetailModalProps {
  store: Store | null;
  onClose: () => void;
  onNavigateTo3D?: (store: Store) => void;
}

export default function StoreDetailModal({ store, onClose, onNavigateTo3D }: StoreDetailModalProps) {
  const [appointmentRequested, setAppointmentRequested] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');

  if (!store) return null;

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    setAppointmentRequested(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#ccff00', '#ffffff', '#222222', '#c5a880'],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-black border border-white/15 rounded-2xl overflow-hidden shadow-2xl max-h-[92vh] flex flex-col my-auto animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Cover Image */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-zinc-900">
          <img 
            src={store.coverImage} 
            alt={store.name} 
            onError={(e) => {
              e.currentTarget.src = FALLBACK_STORE_IMG;
            }}
            className="w-full h-full object-cover filter brightness-[0.70] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-black/70 border border-white/20 text-white hover:bg-white/20 flex items-center justify-center transition-all"
          >
            <X size={18} />
          </button>

          {/* Badges on image */}
          <div className="absolute top-5 left-5 z-10 flex items-center gap-2">
            <span className="px-3 py-1 rounded text-xs font-mono uppercase tracking-wider bg-white text-black font-semibold">
              {store.badge}
            </span>
            <span className="px-3 py-1 rounded text-xs font-mono uppercase tracking-wider bg-black/80 text-zinc-300 border border-white/20">
              {store.category}
            </span>
          </div>

          {/* Title & Tagline in header */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-1">
              <span>{store.level} • UNIT {store.unitNumber}</span>
              <span className="text-white/30">•</span>
              <span>{store.sqft.toLocaleString()} SQ.FT</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display text-white">{store.name}</h2>
            <p className="text-sm sm:text-base text-zinc-300 italic font-editorial mt-1">{store.tagline}</p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1 bg-black">
          
          {/* Description */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">Atelier Profile & Architecture</h3>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-light">
              {store.description}
            </p>
          </div>

          {/* Curator's Note */}
          <div className="p-4 rounded-xl bg-zinc-950 border border-white/10 flex items-start gap-3.5">
            <Sparkles className="text-[#ccff00] shrink-0 mt-0.5" size={17} />
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-white">Curator’s Architectural Note</div>
              <div className="text-xs text-zinc-400 mt-1 leading-relaxed">{store.curatorNotes}</div>
            </div>
          </div>

          {/* Amenities & Services */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-3">VIP Amenities & Services</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {store.amenities.map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-2.5 p-3 rounded-lg bg-zinc-950 border border-white/10 text-xs text-zinc-300">
                  <CheckCircle2 size={14} className="text-[#ccff00] shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hours & Direct Telephony */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-zinc-950 border border-white/10 flex items-center justify-center text-white">
                <Clock size={17} />
              </div>
              <div>
                <div className="text-[11px] font-mono text-zinc-500 uppercase">Operational Timings</div>
                <div className="text-sm text-white font-medium">{store.openingHours}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-zinc-950 border border-white/10 flex items-center justify-center text-white">
                <Phone size={17} />
              </div>
              <div>
                <div className="text-[11px] font-mono text-zinc-500 uppercase">VIP Salon Concierge</div>
                <div className="text-sm text-white font-medium">{store.phone}</div>
              </div>
            </div>
          </div>

          {/* VIP Private Appointment Booking Form */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <h3 className="text-base font-display text-white mb-2 flex items-center gap-2">
              <Calendar size={16} className="text-[#ccff00]" />
              <span>Reserve Private Salon or Styling Appointment</span>
            </h3>
            <p className="text-xs text-zinc-400 mb-4">
              Schedule a dedicated consultation with the boutique director. Chauffeur drop-off & hospitality included.
            </p>

            {appointmentRequested ? (
              <div className="p-4 rounded-xl bg-zinc-950 border border-[#ccff00]/40 flex items-center gap-3 shadow-[0_0_20px_rgba(204,255,0,0.15)]">
                <CheckCircle2 className="text-[#ccff00]" size={22} />
                <div>
                  <div className="text-sm font-medium text-white">Private Appointment Requested</div>
                  <div className="text-xs text-zinc-400">
                    The {store.name} private client director will reach out within 30 minutes to confirm your private salon booking.
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBookAppointment} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Your Full Name"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="px-4 py-2.5 rounded-lg bg-zinc-950 border border-white/15 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-[#ccff00] font-mono"
                />
                <input
                  type="tel"
                  required
                  placeholder="Contact Mobile (+91)"
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  className="px-4 py-2.5 rounded-lg bg-zinc-950 border border-white/15 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-[#ccff00] font-mono"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-lg bg-[#ccff00] hover:bg-[#d8ff1a] text-black font-semibold text-xs tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(204,255,0,0.35)] active:scale-95"
                >
                  Confirm Reservation
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 bg-zinc-950 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
            <ShieldCheck size={14} className="text-white" />
            <span>Official Aranya Promenade Tenant</span>
          </div>

          <div className="flex items-center gap-3">
            {onNavigateTo3D && (
              <button
                onClick={() => {
                  onNavigateTo3D(store);
                  onClose();
                }}
                className="px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-medium border border-white/15 transition-all flex items-center gap-1.5"
              >
                <Compass size={14} />
                <span>Locate on Map</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-all"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
