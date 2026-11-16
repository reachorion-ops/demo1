import React, { useState, useMemo } from 'react';
import { Store, StoreCategory } from '../../types';
import { Search, ArrowUpRight, Tag } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface StoreDirectoryProps {
  stores: Store[];
  onSelectStore: (store: Store) => void;
  onLocateOnMap?: (store: Store) => void;
}

const FALLBACK_STORE_IMG = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop';

const CATEGORIES: StoreCategory[] = [
  'Haute Couture & Fashion',
  'Fine Watches & High Jewelry',
  'Tech, Sound & Innovation',
  'Artisanal Indian Luxury',
  'Gourmet Gastronomy & Wine',
  'Holistic Wellness & Spa',
  'Entertainment & Cinema',
];

export default function StoreDirectory({ stores, onSelectStore, onLocateOnMap }: StoreDirectoryProps) {
  const { ref, isVisible } = useScrollReveal();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');

  const filteredStores = useMemo(() => {
    return stores.filter((store) => {
      const matchesSearch =
        store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.unitNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'All' || store.category === selectedCategory;
      const matchesLevel = selectedLevel === 'All' || store.levelShort === selectedLevel;

      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [stores, searchQuery, selectedCategory, selectedLevel]);

  return (
    <section id="directory" className="relative w-full py-28 bg-black border-t border-white/[0.08] overflow-hidden">
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
              <span>THE CURATED REPERTORY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-normal text-white tracking-tight leading-[1.1]">
              Maisons, Ateliers & <br />
              <span className="bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent font-editorial italic font-normal">
                Flagship Pavilions
              </span>
            </h2>
          </div>

          <p className="max-w-md text-zinc-400 text-sm font-light leading-relaxed">
            A curated collective of global fashion houses, Swiss Haute Horlogerie salons, modern Indian couture, and private tasting lounges across four biophilic tiers.
          </p>
        </div>

        {/* Search & Filter Control Bar */}
        <div className="flex flex-col gap-5 mb-12">

          {/* Search bar & Level selector */}
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={17} />
              <input
                type="text"
                placeholder="Search by brand name, watchmaker, couture house, or unit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 rounded-lg bg-zinc-950 border border-white/10 text-white placeholder-zinc-500 text-xs font-mono focus:outline-none focus:border-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[11px] font-mono text-zinc-500 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Level Quick Select */}
            <div className="flex items-center gap-1 p-1 rounded-lg bg-zinc-950 border border-white/10 w-full md:w-auto overflow-x-auto">
              {[
                { label: 'All Tiers', val: 'All' },
                { label: 'Tier 00', val: 'L0' },
                { label: 'Tier 01', val: 'L1' },
                { label: 'Tier 02', val: 'L2' },
                { label: 'Tier 03', val: 'L3' },
              ].map((lvl) => (
                <button
                  key={lvl.val}
                  onClick={() => setSelectedLevel(lvl.val)}
                  className={`px-4 py-2 rounded-md text-xs font-mono transition-all ${selectedLevel === lvl.val
                      ? 'bg-[#ccff00] text-black font-semibold shadow-[0_0_12px_rgba(204,255,0,0.25)]'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                    }`}
                >
                  {lvl.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-4 py-2 rounded-md text-xs font-mono tracking-wider uppercase whitespace-nowrap transition-all ${selectedCategory === 'All'
                  ? 'bg-[#ccff00] text-black font-semibold shadow-[0_0_15px_rgba(204,255,0,0.3)]'
                  : 'text-zinc-400 hover:text-white bg-zinc-950 border border-white/10 hover:border-white/30'
                }`}
            >
              All Categories ({stores.length})
            </button>
            {CATEGORIES.map((cat) => {
              const count = stores.filter((s) => s.category === cat).length;
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-md text-xs font-mono tracking-wider uppercase whitespace-nowrap transition-all flex items-center gap-1.5 ${isSelected
                      ? 'bg-[#ccff00] text-black font-semibold shadow-[0_0_15px_rgba(204,255,0,0.3)]'
                      : 'text-zinc-400 hover:text-white bg-zinc-950 border border-white/10 hover:border-white/30'
                    }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] font-mono ${isSelected ? 'text-black/80 font-bold' : 'opacity-60'}`}>({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Directory Results Grid */}
        {filteredStores.length === 0 ? (
          <div className="py-20 text-center rounded-xl bg-zinc-950 border border-white/10">
            <Tag size={32} className="mx-auto text-zinc-600 mb-3" />
            <h3 className="text-lg font-display text-white">No Maisons Found</h3>
            <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto font-light">
              No store matches your filter criteria. Try searching for a different keyword or reset filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedLevel('All');
              }}
              className="mt-4 px-4 py-2 rounded-lg bg-zinc-900 text-white text-xs font-mono border border-white/10"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredStores.map((store, idx) => (
              <div
                key={store.id}
                onClick={() => onSelectStore(store)}
                style={{ animationDelay: `${Math.min(idx * 45, 450)}ms` }}
                className="group relative rounded-xl bg-zinc-950 border border-white/10 overflow-hidden hover:border-[#ccff00]/40 transition-all duration-300 flex flex-col cursor-pointer shadow-lg hover:-translate-y-1.5 hover:shadow-[0_0_30px_rgba(204,255,0,0.12)] animate-fade-in-up"
              >
                {/* Store Cover Image */}
                <div className="relative h-60 w-full overflow-hidden bg-zinc-900">
                  <img
                    src={store.coverImage}
                    alt={store.name}
                    onError={(e) => {
                      e.currentTarget.src = FALLBACK_STORE_IMG;
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[0.75] contrast-[1.05]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/30" />

                  {/* Badge Pills */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-black/80 text-white border border-white/20 backdrop-blur-md flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] animate-pulse" />
                      <span>{store.badge}</span>
                    </span>
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-black/60 text-zinc-400 border border-white/10 backdrop-blur-md">
                      {store.levelShort}
                    </span>
                  </div>

                  {/* Corner Action Arrow */}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/70 border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-[#ccff00] group-hover:text-black group-hover:border-[#ccff00] group-hover:shadow-[0_0_15px_rgba(204,255,0,0.4)] transition-all duration-300">
                    <ArrowUpRight size={14} />
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-1">
                      <span>{store.category}</span>
                      <span>UNIT {store.unitNumber}</span>
                    </div>

                    <h3 className="text-xl font-display text-white group-hover:text-white transition-colors mt-1">
                      {store.name}
                    </h3>

                    <p className="text-xs text-zinc-400 italic font-editorial mt-1">
                      {store.tagline}
                    </p>

                    <p className="text-xs text-zinc-400 mt-3 line-clamp-2 leading-relaxed font-light">
                      {store.description}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs">
                    <span className="text-[11px] font-mono text-zinc-500">
                      {store.sqft.toLocaleString()} sq.ft
                    </span>

                    <span className="text-xs text-white group-hover:text-[#ccff00] font-mono group-hover:translate-x-0.5 transition-all flex items-center gap-1 font-medium">
                      <span>Explore Dossier</span>
                      <ArrowUpRight size={12} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
