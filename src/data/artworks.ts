export interface Artwork {
  id: string;
  title: string;
  medium: string;
  year: number;
  price: number;
  img: string;
  tag: string;
  story: {
    chapter1: { heading: string; body: string };
    chapter2: { heading: string; body: string };
    chapter3: { heading: string; body: string };
    chapter4: { heading: string; body: string };
    chapter5: { heading: string; body: string };
  };
}

export const artworks: Artwork[] = [
  {
    id: 'stillness',
    title: 'Stillness I',
    medium: 'Acrylic',
    year: 2024,
    price: 45000,
    img: 'https://picsum.photos/seed/still1/800/1000',
    tag: 'Featured',
    story: {
      chapter1: { heading: 'The First Mark', body: 'Every painting begins with silence. Before the brush touches the canvas, there is a pause — a breath held between intention and action.' },
      chapter2: { heading: 'Form Emerges', body: 'Shape arrives not through force but through allowing. The colour finds its place, the edge softens, the form breathes.' },
      chapter3: { heading: 'The Middle Hours', body: 'This is where most paintings are lost — in the uncertainty of the middle. But uncertainty is where the real work happens.' },
      chapter4: { heading: 'A Language of Colour', body: 'Each hue carries memory. The warm sienna holds afternoon light. The soft green holds the quiet of early morning.' },
      chapter5: { heading: 'What Remains', body: 'When the painting is finished, it no longer belongs to the artist. It belongs to the silence between two people looking at the same thing.' },
    },
  },
  {
    id: 'reverie',
    title: 'Green Reverie',
    medium: 'Watercolour',
    year: 2024,
    price: 28000,
    img: 'https://picsum.photos/seed/rev1/800/1000',
    tag: 'New',
    story: {
      chapter1: { heading: 'Origin', body: 'Watercolour does not forgive hesitation. Each stroke is a commitment, each wash a trust.' },
      chapter2: { heading: 'Water and Pigment', body: 'The medium moves on its own terms. The artist learns to follow, not lead.' },
      chapter3: { heading: 'Green as Memory', body: 'This particular green arrived from a walk in early spring — the colour of light through new leaves.' },
      chapter4: { heading: 'Transparency', body: 'What is beautiful about watercolour is what is left out. The white of the paper breathes through every layer.' },
      chapter5: { heading: 'Reverie', body: 'A reverie is not a dream. It is a waking state — alert but soft, present but drifting.' },
    },
  },
  {
    id: 'morning',
    title: 'Pale Morning',
    medium: 'Mixed media',
    year: 2023,
    price: 32000,
    img: 'https://picsum.photos/seed/morn1/800/1000',
    tag: 'Sold',
    story: {
      chapter1: { heading: 'Before Sunrise', body: 'The city is quiet. The light is the colour of old linen. This is the hour that belongs to no one.' },
      chapter2: { heading: 'Layering', body: 'Mixed media allows contradiction. Soft beside rough. Transparent over opaque. The painting holds its own tensions.' },
      chapter3: { heading: 'Morning as Subject', body: 'Not the dramatic sunrise but the quiet before — the grey-pink wash of sky, the stillness before movement.' },
      chapter4: { heading: 'Texture', body: 'The surface is built up over weeks. Each layer added and sometimes taken away. Like memory, it accumulates.' },
      chapter5: { heading: 'Letting Go', body: 'Every painting reaches a point where adding more would be a mistake. Knowing when to stop is its own discipline.' },
    },
  },
  {
    id: 'drift',
    title: 'Slow Drift',
    medium: 'Oil on linen',
    year: 2023,
    price: 58000,
    img: 'https://picsum.photos/seed/drift1/800/1000',
    tag: 'Featured',
    story: {
      chapter1: { heading: 'Oil and Linen', body: 'Linen has been the painter\'s surface for centuries. Its texture is alive — you can feel it beneath every brushstroke.' },
      chapter2: { heading: 'Slow Work', body: 'Oil painting cannot be rushed. Each layer must dry. The work teaches patience, or it teaches nothing.' },
      chapter3: { heading: 'Movement Without Motion', body: 'The painting depicts stillness but contains movement — the movement of thought, of time passing, of light shifting.' },
      chapter4: { heading: 'The Palette', body: 'Warm whites. Muted ochres. A single note of deep green. The colours are few and the painting is richer for it.' },
      chapter5: { heading: 'Completion', body: 'Slow Drift took four months. Some paintings demand time. Time is not wasted — it becomes part of the work.' },
    },
  },
  {
    id: 'fragment',
    title: 'Fragment III',
    medium: 'Acrylic on board',
    year: 2024,
    price: 22000,
    img: 'https://picsum.photos/seed/frag3/800/1000',
    tag: 'New',
    story: {
      chapter1: { heading: 'Series', body: 'Fragment III is part of an ongoing series exploring incompleteness as a compositional principle.' },
      chapter2: { heading: 'The Edge', body: 'Where does a painting end? The edge of the canvas is a decision, not a boundary.' },
      chapter3: { heading: 'Board as Ground', body: 'Painting on board gives acrylic a different character — harder, more direct, less forgiving.' },
      chapter4: { heading: 'Restraint', body: 'The impulse is always to fill the space. The discipline is in resisting. Empty space is not empty.' },
      chapter5: { heading: 'Fragment', body: 'A fragment implies a whole that once existed. The painting asks: what is missing, and does it matter?' },
    },
  },
  {
    id: 'colour',
    title: 'Colour Study I',
    medium: 'Gouache',
    year: 2023,
    price: 15000,
    img: 'https://picsum.photos/seed/col1/800/1000',
    tag: 'Available',
    story: {
      chapter1: { heading: 'Study', body: 'A study is permission to fail. It is practice made visible, process made permanent.' },
      chapter2: { heading: 'Gouache', body: 'Opaque watercolour. Matte finish. The colours are flat and true. There is no hiding in gouache.' },
      chapter3: { heading: 'Colour Relationships', body: 'Colour does not exist alone. Every hue is defined by what surrounds it. Placing two colours together changes both.' },
      chapter4: { heading: 'The Grid', body: 'The composition is simple: a grid of colour relationships. But simple is not the same as easy.' },
      chapter5: { heading: 'Repetition', body: 'The study will be repeated. Each iteration teaches something the previous one could not.' },
    },
  },
];

export const featuredArtworks = artworks.filter(a => a.tag === 'Featured' || a.tag === 'New').slice(0, 3);
