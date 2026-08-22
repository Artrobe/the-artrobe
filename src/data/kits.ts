// DIY kit offerings. `shopifyProductId` is optional — when set (and Shopify creds
// are configured in shopify.ts), a live Buy Button renders; otherwise the card
// falls back to a WhatsApp enquiry CTA. Fill product IDs after creating them in Shopify.
export interface Kit {
  id: string;
  name: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  desc: string;
  price: string;
  img: string;
  shopifyProductId?: string;
}

export const KITS: Kit[] = [
  {
    id: 'coastal-easy',
    name: 'Coastal Leaf',
    difficulty: 'Easy',
    desc: 'A calm monstera-leaf canvas — the perfect first brushstroke.',
    price: '₹599',
    img: '/artworks/earths-whisper-thumb.webp',
  },
  {
    id: 'blue-door-medium',
    name: 'Blue Door',
    difficulty: 'Medium',
    desc: 'Bougainvillea spilling over a Mediterranean doorway.',
    price: '₹799',
    img: '/artworks/floral-study-thumb.webp',
  },
  {
    id: 'koi-hard',
    name: 'Koi & Foliage',
    difficulty: 'Hard',
    desc: 'Bold botanicals and a gliding koi — for the confident hand.',
    price: '₹999',
    img: '/artworks/crimson-whispers-thumb.webp',
  },
];

const DIFFICULTY_COLOR: Record<Kit['difficulty'], string> = {
  Easy: '#6E9E66',
  Medium: '#C79A3E',
  Hard: '#B5533F',
};

export const difficultyColor = (d: Kit['difficulty']) => DIFFICULTY_COLOR[d];
