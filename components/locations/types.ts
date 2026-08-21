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
    name: 'Head Office — Nansana',
    type: 'headquarters',
    address: 'Plot 7441 Nakuule Zone (Behind Seven Sisters\' Building), Nansana Hoima Road, P.O Box 37565, Wakiso, Uganda',
    city: 'Nansana',
    district: 'Wakiso District',
    lat: 0.3629,
    lng: 32.5347,
    phone: '(+256) 394500 421 / (+256) 782241305',
    email: 'info@ambso.org',
    isPrimary: true,
  },
  {
    id: 'hoima-office',
    name: 'Hoima Field Office',
    type: 'office',
    address: 'Ishaka Kijjungu, Along Hospital Way, Behind Hoima Regional Referral Hospital Mental Unit, P.O Box 306, Hoima, Uganda',
    city: 'Hoima',
    district: 'Hoima District',
    lat: 1.4269213,
    lng: 31.352323,
    phone: '(+256) 394500 421 / (+256) 782241305',
    email: 'info@ambso.org',
    isPrimary: false,
  },
  {
    id: 'masaka-office',
    name: 'Masaka Field Office',
    type: 'office',
    address: 'Kalisizo Town, Old Bukoba Road, Near Kalisizo Sub-County Headquarters, P.O Box 220155, Masaka, Uganda',
    city: 'Kalisizo',
    district: 'Masaka District',
    lat: -0.5400625,
    lng: 31.6221875,
    phone: '(+256) 394500 421 / (+256) 782241305',
    email: 'info@ambso.org',
    isPrimary: false,
  },
];

export const UGANDA_CENTER: [number, number] = [0.9, 32.0];
export const UGANDA_ZOOM = 7;
