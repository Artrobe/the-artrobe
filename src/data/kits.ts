// DIY kit offerings. `shopifyProductId` is optional — when set (and Shopify creds
// are configured in shopify.ts), a live Buy Button renders; otherwise the card
// falls back to a WhatsApp enquiry CTA. Fill product IDs after creating them in Shopify.
// TODO(jahnvi): confirm final pricing and that each kit's real contents match
// what its product image shows before selling.
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
    id: 'pichwai-lotus',
    name: 'Pichwai Lotus — Miniature',
    difficulty: 'Medium',
    desc: 'A gentle entry into Pichwai: paint a lotus pond in the Nathdwara palette with fine brushes and gold accents. Includes 8-inch panel, 6 gouache shades, 2 detail brushes and a traced outline sheet.',
    price: '₹1,299',
    img: '/kits/pichwai-lotus.webp',
  },
  {
    id: 'moon-tide-round',
    name: 'Moon Tide — Round',
    difficulty: 'Easy',
    desc: 'A midnight-blue textured moonscape on a 10-inch round base. Palette knife waves, one metallic accent, done in a single sitting. Includes texture paste, 4 acrylics and a moon stencil.',
    price: '₹999',
    img: '/kits/moon-tide-round.webp',
  },
  {
    id: 'golden-seams',
    name: 'Golden Seams — Kintsugi Florals',
    difficulty: 'Medium',
    desc: 'Crack-texture a 12-inch panel, then trace the seams in gold — florals that celebrate the flaw. Includes crackle medium, gold leaf pen, 3 pigments and a floral transfer sheet.',
    price: '₹1,699',
    img: '/kits/golden-seams.webp',
  },
  {
    id: 'shrinathji-mini',
    name: 'Shrinathji Miniature — Devotional',
    difficulty: 'Hard',
    desc: 'A traditional miniature study with the full shringar palette — for those ready to slow down. Includes 8×10 inch board, 8 gouache shades, 000-size brushes and a step-by-step filmed guide.',
    price: '₹2,199',
    img: '/kits/shrinathji-mini.webp',
  },
  {
    id: 'terracotta-garden',
    name: 'Terracotta Garden',
    difficulty: 'Easy',
    desc: 'Warm terracotta, olive and cream — a raised botanical relief you can finish before dinner. Includes 9×12 inch canvas, texture paste, 3 earthy acrylics and leaf stencils.',
    price: '₹799',
    img: '/kits/terracotta-garden.webp',
  },
  {
    id: 'mandala-dot-art',
    name: 'Mandala Dot Art — Round',
    difficulty: 'Easy',
    desc: 'The most forgiving kit in the ladder: dot-by-dot mandala on an 8-inch round base. Includes 5 dotting tools, 6 acrylics and a centering guide. Ideal first kit, gift-friendly.',
    price: '₹599',
    img: '/kits/mandala-dot-art.webp',
  },
  {
    id: 'jharokha-frame',
    name: 'Jharokha Frame — Heritage',
    difficulty: 'Hard',
    desc: 'Build and paint a miniature jharokha arch with carved-look texture and antique gold finish. Includes MDF arch kit, relief paste, 5 pigments and antiquing wax. A weekend project.',
    price: '₹2,799',
    img: '/kits/jharokha-frame.webp',
  },
];

const DIFFICULTY_COLOR: Record<Kit['difficulty'], string> = {
  Easy: '#6E9E66',
  Medium: '#C79A3E',
  Hard: '#B5533F',
};

export const difficultyColor = (d: Kit['difficulty']) => DIFFICULTY_COLOR[d];
