export interface MapLocation {
  id: string;
  name: string;
  type: 'headquarters' | 'office';
  address: string;
  city: string;
  district: string;
  lat: number;
  lng: number;
  phone?: string;
  email?: string;
  isPrimary: boolean;
}

export const FALLBACK_LOCATIONS: MapLocation[] = [
  {
    id: 'headquarters',
    name: 'Headquarters — Nansana',
    type: 'headquarters',
    address: 'Nansana, Wakiso District',
    city: 'Nansana',
    district: 'Wakiso District',
    lat: 0.3629,
    lng: 32.5347,
    phone: '+256 481 420 189',
    email: 'info@ambso.org',
    isPrimary: true,
  },
  {
    id: 'hoima-office',
    name: 'Hoima Field Office',
    type: 'office',
    address: 'Hoima Town',
    city: 'Hoima',
    district: 'Hoima',
    lat: 1.4292,
    lng: 31.3523,
    phone: '+256 700 000 002',
    email: 'hoima@ambso.org',
    isPrimary: false,
  },
  {
    id: 'masaka-office',
    name: 'Masaka Field Office',
    type: 'office',
    address: 'Masaka Town',
    city: 'Masaka',
    district: 'Masaka',
    lat: -0.3136,
    lng: 31.7339,
    phone: '+256 700 000 003',
    email: 'masaka@ambso.org',
    isPrimary: false,
  },
];

export const UGANDA_CENTER: [number, number] = [0.9, 32.0];
export const UGANDA_ZOOM = 7;
