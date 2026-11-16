export type StoreCategory = 
  | 'Haute Couture & Fashion'
  | 'Fine Watches & High Jewelry'
  | 'Tech, Sound & Innovation'
  | 'Artisanal Indian Luxury'
  | 'Gourmet Gastronomy & Wine'
  | 'Holistic Wellness & Spa'
  | 'Entertainment & Cinema';

export type MallLevel = 
  | 'Level 0 — The Living Ground'
  | 'Level 1 — The Glass Pavilion'
  | 'Level 2 — The Canopy Terraces'
  | 'Level 3 — The Oasis Skydeck';

export interface Store {
  id: string;
  name: string;
  tagline: string;
  category: StoreCategory;
  level: MallLevel;
  levelShort: 'L0' | 'L1' | 'L2' | 'L3';
  unitNumber: string;
  sqft: number;
  badge: 'Flagship Store' | 'Exclusive Atelier' | 'New Debut' | 'Now Open' | 'Leasing Opportunity';
  status: 'Open' | 'Leasing Available' | 'Coming Soon';
  description: string;
  featured: boolean;
  coverImage: string;
  openingHours: string;
  phone: string;
  curatorNotes: string;
  amenities: string[];
  coordinates?: { x: number; z: number }; // For 3D spatial map
}

export interface MallLevelInfo {
  id: MallLevel;
  shortCode: 'L0' | 'L1' | 'L2' | 'L3';
  title: string;
  theme: string;
  description: string;
  elevationMeters: string;
  anchorAttraction: string;
  totalStores: number;
}

export interface LeasingProposal {
  brandName: string;
  contactPerson: string;
  email: string;
  phone: string;
  category: StoreCategory;
  preferredLevel: MallLevel;
  targetSqft: number;
  notes?: string;
  submittedAt: string;
}

