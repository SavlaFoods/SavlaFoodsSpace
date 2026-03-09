// ─── Location ─────────────────────────────────────────────────────────────────

export type FloorCode = 'G' | '1' | '2' | '3';

export interface LocationId {
  chamberId: number; // e.g. 21
  floor: FloorCode;  // e.g. G
  bay: number;       // e.g. 10
}

/** Formats to "21G-10" */
export function formatLocationCode(loc: LocationId): string {
  return `${loc.chamberId}${loc.floor}-${loc.bay}`;
}

/** Parses "21G-10" → { chamberId:21, floor:'G', bay:10 } */
export function parseLocationCode(code: string): LocationId | null {
  const match = code.match(/^(\d+)([G0-9])-(\d+)$/);
  if (!match) {return null;}
  return {
    chamberId: parseInt(match[1], 10),
    floor: match[2] as FloorCode,
    bay: parseInt(match[3], 10),
  };
}

// ─── Lot ──────────────────────────────────────────────────────────────────────

export interface Lot {
  lotNo: string;
  category: CategoryName;
  subCategory: string;
  item: string;
  location: LocationId;
  units: number;
  maxUnits: number;
  addedDate: string;
  expiryDate?: string;
}

export function getFillPercent(lot: Lot): number {
  return Math.round((lot.units / lot.maxUnits) * 100);
}

export type FillStatus = 'empty' | 'available' | 'nearFull' | 'full';

export function getFillStatus(lot?: Lot): FillStatus {
  if (!lot) {return 'empty';}
  const pct = getFillPercent(lot);
  if (pct >= 95) {return 'full';}
  if (pct >= 75) {return 'nearFull';}
  return 'available';
}

// ─── Category ─────────────────────────────────────────────────────────────────

export type CategoryName =
  | 'Fresh Fruit'
  | 'Vegetable'
  | 'Spices'
  | 'Natural Herb'
  | 'Pharma'
  | 'Accessories'
  | 'Grain'
  | 'Bajra Crispies'
  | 'Dry Fruit'
  | 'Process Food'
  | 'Frozen';

export type ContainerType =
  | 'Deep Freeze'
  | 'Cold Storage'
  | 'Controlled Temp'
  | 'Ambient Rack';

export interface CategoryMeta {
  icon: string;
  color: string;
  bgColor: string;
  tempRange: string;
  humidity: string;
  containerType: ContainerType;
  note?: string;
  subCategories: Record<string, string[]>;
}

// ─── Ripening ─────────────────────────────────────────────────────────────────

export interface RipeningChamber {
  id: string;
  commodity: string;
  stage: number; // 1–7
  ethylene: string;
  temperature: string;
  etaDays: number;
  progress: number; // 0–100
  lotNo: string;
}

// ─── Navigation ───────────────────────────────────────────────────────────────

export type RootTabParamList = {
  Dashboard: undefined;
  SpaceMap: undefined;
  Lots: undefined;
  Advisor: undefined;
  Ripening: undefined;
};
