import React, { useState } from 'react';
import { Store, StoreCategory, MallLevel } from '../../types';
import { X, Plus, Edit2, Trash2, Download, RotateCcw, Building, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CMSManagerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  stores: Store[];
  onAddStore: (newStore: Store) => void;
  onUpdateStore: (updatedStore: Store) => void;
  onDeleteStore: (id: string) => void;
  onResetDefaults: () => void;
}

const CATEGORIES: StoreCategory[] = [
  'Haute Couture & Fashion',
  'Fine Watches & High Jewelry',
  'Tech, Sound & Innovation',
  'Artisanal Indian Luxury',
  'Gourmet Gastronomy & Wine',
  'Holistic Wellness & Spa',
  'Entertainment & Cinema',
];

const LEVELS: MallLevel[] = [
  'Level 0 — The Living Ground',
  'Level 1 — The Glass Pavilion',
  'Level 2 — The Canopy Terraces',
  'Level 3 — The Oasis Skydeck',
];

export default function CMSManagerDrawer({
  isOpen,
  onClose,
  stores,
  onAddStore,
  onUpdateStore,
  onDeleteStore,
  onResetDefaults,
}: CMSManagerDrawerProps) {
  const [activeTab, setActiveTab] = useState<'list' | 'add' | 'export'>('list');
  const [editingStoreId, setEditingStoreId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState<Partial<Store>>({
    name: '',
    tagline: '',
    category: 'Haute Couture & Fashion',
    level: 'Level 0 — The Living Ground',
    levelShort: 'L0',
    unitNumber: 'G-15',
    sqft: 2500,
    badge: 'Now Open',
    status: 'Open',
    description: '',
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop',
    openingHours: '10:00 AM — 10:00 PM IST',
    phone: '+91 (080) 4920 8800',
    curatorNotes: '',
    amenities: ['VIP Concierge', 'Valet Parking'],
  });

  if (!isOpen) return null;

  const totalSqftOccupied = stores.reduce((acc, s) => acc + s.sqft, 0);

  const handleEditClick = (store: Store) => {
    setEditingStoreId(store.id);
    setFormData(store);
    setActiveTab('add');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const levelShort = 
      formData.level === 'Level 0 — The Living Ground' ? 'L0' :
      formData.level === 'Level 1 — The Glass Pavilion' ? 'L1' :
      formData.level === 'Level 2 — The Canopy Terraces' ? 'L2' : 'L3';

    if (editingStoreId) {
      onUpdateStore({
        ...formData as Store,
        id: editingStoreId,
        levelShort,
      });
      setEditingStoreId(null);
    } else {
      const newId = (formData.name || 'store').toLowerCase().replace(/[^a-z0-9]/g, '-');
      onAddStore({
        ...formData as Store,
        id: `${newId}-${Date.now()}`,
        levelShort,
      });
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#c5a880', '#ffffff', '#222222'],
      });
    }

    setFormData({
      name: '',
      tagline: '',
      category: 'Haute Couture & Fashion',
      level: 'Level 0 — The Living Ground',
      levelShort: 'L0',
      unitNumber: 'G-15',
      sqft: 2500,
      badge: 'Now Open',
      status: 'Open',
      description: '',
      featured: false,
      coverImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop',
      openingHours: '10:00 AM — 10:00 PM IST',
      phone: '+91 (080) 4920 8800',
      curatorNotes: '',
      amenities: ['VIP Concierge'],
    });
    setActiveTab('list');
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(stores, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `the-aranya-promenade-cms-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const filteredStores = stores.filter(
    (s) => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.unitNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/85 backdrop-blur-md animate-fade-in">
      <div 
        className="w-full max-w-2xl h-full bg-black border-l border-white/10 shadow-2xl flex flex-col animate-slide-in-right"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center text-white">
              <Building size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase">CMS Studio</span>
                <span className="text-[10px] font-mono bg-zinc-800 text-white px-2 py-0.5 rounded">ADMIN</span>
              </div>
              <h2 className="text-lg font-display text-white">Promenade Inventory Manager</h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Telemetry Summary Bar */}
        <div className="px-6 py-3 bg-zinc-950 border-b border-white/5 flex items-center justify-between text-xs font-mono text-zinc-400">
          <div>
            <span className="text-white font-bold">{stores.length}</span> Active Tenancies
          </div>
          <div className="text-zinc-600">|</div>
          <div>
            <span className="text-white font-bold">{totalSqftOccupied.toLocaleString()}</span> sq.ft Leased
          </div>
          <div className="text-zinc-600">|</div>
          <div className="text-zinc-300">
            Live Synchronized
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 pt-4 border-b border-white/10">
          <button
            onClick={() => { setActiveTab('list'); setEditingStoreId(null); }}
            className={`pb-3 text-xs font-medium border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'list'
                ? 'border-[#ccff00] text-white font-semibold'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <span>All Stores ({stores.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('add')}
            className={`pb-3 text-xs font-medium border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'add'
                ? 'border-[#ccff00] text-white font-semibold'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <Plus size={14} />
            <span>{editingStoreId ? 'Edit Store' : 'Add New Maison'}</span>
          </button>

          <button
            onClick={() => setActiveTab('export')}
            className={`pb-3 text-xs font-medium border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'export'
                ? 'border-[#ccff00] text-white font-semibold'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <Download size={14} />
            <span>Schema & Data</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto flex-1 bg-black">
          {activeTab === 'list' && (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Filter stores by brand name or unit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-zinc-950 border border-white/15 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-white font-mono"
              />

              <div className="space-y-2.5">
                {filteredStores.map((store) => (
                  <div
                    key={store.id}
                    className="p-3.5 rounded-lg bg-zinc-950 border border-white/10 hover:border-white/30 transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={store.coverImage}
                        alt={store.name}
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop';
                        }}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-medium text-white">{store.name}</h4>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-white/10">
                            {store.unitNumber}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400">{store.category} • {store.levelShort}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleEditClick(store)}
                        title="Edit store"
                        className="p-2 rounded-md bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white"
                      >
                        <Edit2 size={13} />
                      </button>
                      <button
                        onClick={() => onDeleteStore(store.id)}
                        title="Delete store"
                        className="p-2 rounded-md bg-zinc-900 hover:bg-red-950 text-zinc-400 hover:text-red-400"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'add' && (
            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 mb-1 uppercase text-[10px]">Store / Brand Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Burberry Flagship"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-white/15 text-white focus:outline-none focus:border-white"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1 uppercase text-[10px]">Tagline</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. British Luxury Heritage"
                    value={formData.tagline || ''}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-white/15 text-white focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 mb-1 uppercase text-[10px]">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as StoreCategory })}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-white/15 text-white focus:outline-none focus:border-white"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1 uppercase text-[10px]">Mall Level</label>
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value as MallLevel })}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-white/15 text-white focus:outline-none focus:border-white"
                  >
                    {LEVELS.map((l) => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-zinc-400 mb-1 uppercase text-[10px]">Unit Number</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. G-16"
                    value={formData.unitNumber || ''}
                    onChange={(e) => setFormData({ ...formData, unitNumber: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-white/15 text-white focus:outline-none focus:border-white"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1 uppercase text-[10px]">Area (sq.ft)</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 3200"
                    value={formData.sqft || ''}
                    onChange={(e) => setFormData({ ...formData, sqft: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-white/15 text-white focus:outline-none focus:border-white"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1 uppercase text-[10px]">Badge</label>
                  <select
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-white/15 text-white focus:outline-none focus:border-white"
                  >
                    <option value="Flagship Store">Flagship Store</option>
                    <option value="Exclusive Atelier">Exclusive Atelier</option>
                    <option value="New Debut">New Debut</option>
                    <option value="Now Open">Now Open</option>
                    <option value="Leasing Opportunity">Leasing Opportunity</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 mb-1 uppercase text-[10px]">Cover Image URL</label>
                <input
                  type="url"
                  required
                  placeholder="https://..."
                  value={formData.coverImage || ''}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-white/15 text-white focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="block text-zinc-400 mb-1 uppercase text-[10px]">Store Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe the architectural concept, materials, and luxury collection..."
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-white/15 text-white focus:outline-none focus:border-white font-sans text-xs"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => { setActiveTab('list'); setEditingStoreId(null); }}
                  className="px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-[#ccff00] hover:bg-[#d8ff1a] text-black font-semibold text-xs tracking-wider uppercase shadow-[0_0_15px_rgba(204,255,0,0.35)] active:scale-95 transition-all"
                >
                  {editingStoreId ? 'Save Changes' : 'Publish Maison'}
                </button>
              </div>
            </form>
          )}

          {activeTab === 'export' && (
            <div className="space-y-6">
              <div className="p-4 rounded-lg bg-zinc-950 border border-white/10 space-y-3">
                <h3 className="text-sm font-medium text-white">Live Data Export</h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  Export the active tenant database with current listings, square footages, badges, and spatial parameters for Headless CMS ingestion.
                </p>
                <button
                  onClick={handleExportJSON}
                  className="px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-mono font-medium flex items-center gap-2"
                >
                  <Download size={14} />
                  <span>Download Live JSON Dataset</span>
                </button>
              </div>

              <div className="p-4 rounded-lg bg-zinc-950 border border-white/10 space-y-3">
                <h3 className="text-sm font-medium text-zinc-300">Reset to Curated Baseline</h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  Reset the in-memory CMS state to the curated baseline with 18 international & Indian luxury houses.
                </p>
                <button
                  onClick={() => {
                    onResetDefaults();
                    setActiveTab('list');
                  }}
                  className="px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-white/10 text-xs font-mono flex items-center gap-2"
                >
                  <RotateCcw size={14} />
                  <span>Reset All to Factory Defaults</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-zinc-950 flex items-center justify-between text-[11px] font-mono text-zinc-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-white" />
            <span>Real-time In-Browser CMS Synchronized</span>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg bg-white/10 text-white hover:bg-white/15"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
