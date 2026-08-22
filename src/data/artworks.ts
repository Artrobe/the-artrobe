// Nested authoring shape for the static fallback data. The runtime `Artwork`
// type (flat storyN fields) lives in `@/lib/airtable`; `fallbackToArtwork`
// bridges the two.
export interface RawArtwork {
  id: string;
  title: string;
  medium: string;
  year: number;
  price: number;
  img: string;
  imgAspect: string;
  tag: string;
  dimensions: string;
  style: string;
  story: {
    chapter1: { heading: string; body: string };
    chapter2: { heading: string; body: string };
    chapter3: { heading: string; body: string };
    chapter4: { heading: string; body: string };
    chapter5: { heading: string; body: string };
  };
}

export const artworks: RawArtwork[] = [
  {
    id: 'soft-power',
    title: 'Soft Power',
    medium: 'Acrylics on Canvas',
    year: 2026,
    price: 0,
    img: '/artworks/soft-power.webp',
    imgAspect: '2/3',
    tag: 'New',
    dimensions: '30×40 inches',
    style: 'Abstract',
    story: {
      chapter1: {
        heading: 'The Quiet Force',
        body: 'Not all power announces itself. Some of it arrives slowly — a tide rather than a storm. This painting began with that thought: what does strength look like when it has nothing to prove?',
      },
      chapter2: {
        heading: 'Building the Layers',
        body: 'Acrylics were applied in thin, deliberate washes — each layer allowed to breathe before the next arrived. The surface built not through urgency but through accumulation, the way confidence is earned over time.',
      },
      chapter3: {
        heading: 'The Palette Chose Itself',
        body: 'Warm neutrals and soft earth tones dominate — no harsh contrasts, no aggressive marks. The colours exist in conversation with each other, each holding its ground without crowding the other.',
      },
      chapter4: {
        heading: 'Restraint as Language',
        body: 'The composition resists the impulse to fill every corner. The negative space is not empty — it is where the painting breathes, where the eye rests, where the feeling lives.',
      },
      chapter5: {
        heading: 'What It Says',
        body: 'Soft Power is for the wall that needs a presence without noise. It asks nothing of the room and gives everything to it — a painting that holds its space the way a calm person holds a room.',
      },
    },
  },
  {
    id: 'earths-whisper',
    title: "Earth's Whisper",
    medium: 'Acrylics on Canvas',
    year: 2026,
    price: 0,
    img: '/artworks/earths-whisper.webp',
    imgAspect: '2/3',
    tag: 'New',
    dimensions: '36×48 inches',
    style: 'Abstract',
    story: {
      chapter1: {
        heading: 'Listening to the Ground',
        body: 'The earth does not speak in sentences. It speaks in textures — in the cracked face of dry soil, the softness of moss, the way roots hold things together beneath the surface. This painting began as an act of listening.',
      },
      chapter2: {
        heading: 'Ochres and Umbers',
        body: 'The palette came directly from the land — raw umber, burnt sienna, the warm grey of stone, the deep green of shadow. These are not chosen colours; they are found ones.',
      },
      chapter3: {
        heading: 'The Large Format',
        body: 'At 36×48 inches, the canvas demands presence. You do not look at this painting from across the room — you stand inside it. The scale is intentional: the earth is not a detail.',
      },
      chapter4: {
        heading: 'Marks and Memory',
        body: 'Some marks were made with a palette knife, some with the heel of a hand. Each gesture leaves its own kind of trace — the way every season leaves its mark on the landscape.',
      },
      chapter5: {
        heading: 'What Returns to Us',
        body: "There is a particular feeling that comes from standing near something ancient. Earth's Whisper is an attempt to hold that feeling still long enough to bring it inside — into the room, into daily life.",
      },
    },
  },
  {
    id: 'ocean-mind',
    title: 'Ocean Mind',
    medium: 'Acrylics on Canvas',
    year: 2026,
    price: 0,
    img: '/artworks/ocean-mind.webp',
    imgAspect: '2/3',
    tag: 'New',
    dimensions: '36×48 inches',
    style: 'Abstract',
    story: {
      chapter1: {
        heading: 'Surface and Depth',
        body: 'The ocean looks one way from above and another way entirely from beneath. The mind works the same — there is what is visible, and there is what moves unseen in the deeper currents.',
      },
      chapter2: {
        heading: 'Blues That Are Not Quite Blue',
        body: 'Mixing the colour of water is deceptive work. It is never simply blue — there is green in it, violet, grey, the reflection of sky. Each layer of the painting attempts a different reading of that complexity.',
      },
      chapter3: {
        heading: 'The Rhythm of Waves',
        body: 'The compositional structure mimics oceanic rhythm — a pattern that is repetitive but never exactly repeated. Like breathing, like thought, like the motion of water that never returns to the same form twice.',
      },
      chapter4: {
        heading: 'Holding Uncertainty',
        body: 'Ocean Mind was painted during a period of not knowing. The canvas became a place to sit with that — not to resolve it, but to make it beautiful. Uncertainty rendered in colour is somehow easier to bear.',
      },
      chapter5: {
        heading: 'For Rooms That Need Depth',
        body: 'This is a painting that changes with the light. In morning it is one thing; in the evening another. Like the ocean, it has moods — and like the ocean, it remains.',
      },
    },
  },
  {
    id: 'hold',
    title: 'Hold',
    medium: 'Acrylics on Canvas',
    year: 2025,
    price: 0,
    img: '/artworks/hold.webp',
    imgAspect: '5/4',
    tag: 'Featured',
    dimensions: '36×48 inches',
    style: 'Contemporary Expressionism',
    story: {
      chapter1: {
        heading: 'The Word Itself',
        body: 'Hold. It means to grip, to contain, to pause. It also means to endure — as in, hold on. This painting lives at the intersection of all those meanings, in the tension between letting go and staying.',
      },
      chapter2: {
        heading: 'Expressionism as Honesty',
        body: 'There was no preliminary sketch for this piece. The marks come directly from feeling — urgent in places, slow in others, occasionally violent where the emotion demanded it. Expressionism does not explain itself; it shows itself.',
      },
      chapter3: {
        heading: 'The Body in Paint',
        body: 'Contemporary expressionism returns painting to the physical. The brushstroke is not decorative — it is evidence. Every mark on this canvas is a record of a moment in the body of the artist.',
      },
      chapter4: {
        heading: 'What We Hold',
        body: 'Grief holds. Hope holds. The way a hand holds another hand in a moment that cannot last. This painting does not resolve the tension it names — it holds it, carefully, the way you hold something that must not be dropped.',
      },
      chapter5: {
        heading: 'Presence',
        body: 'Hold works best on a wall where you live — not a public wall, but a personal one. It is the kind of painting that finds you at different hours with different things to say.',
      },
    },
  },
  {
    id: 'the-stillness-she-speaks',
    title: 'The Stillness She Speaks',
    medium: 'Acrylics on Canvas',
    year: 2025,
    price: 0,
    img: '/artworks/the-stillness-she-speaks.webp',
    imgAspect: '2/3',
    tag: 'Featured',
    dimensions: '36×48 inches',
    style: 'Contemporary Figurative',
    story: {
      chapter1: {
        heading: 'The Figure',
        body: 'Figurative painting carries a long history of speaking about women rather than for them. This work attempts something different — a figure whose stillness is not passivity but presence, not absence but a kind of full, deliberate quiet.',
      },
      chapter2: {
        heading: 'What the Body Knows',
        body: 'The posture was studied before it was painted. Stillness, when it is genuine, has its own particular shape — the weight distributed differently, the shoulders released, the gaze turned somewhere the viewer cannot follow.',
      },
      chapter3: {
        heading: 'Colour as Character',
        body: 'The palette was chosen to hold the figure without framing her. Warm grounds, cooler midtones — the colours are in conversation, not competition. The background is not empty; it is listening.',
      },
      chapter4: {
        heading: 'Contemporary Figurative',
        body: 'This work belongs to a contemporary tradition that refuses both idealisation and reduction. The figure is not a symbol, not a metaphor — she is a specific presence, painted with the attention that specificity deserves.',
      },
      chapter5: {
        heading: 'The Language of Quiet',
        body: 'She speaks, but not in words. The painting asks you to be still enough to hear it — and in that stillness, to perhaps recognise something of yourself.',
      },
    },
  },
  {
    id: 'orchid-bloom',
    title: 'Orchid Bloom',
    medium: 'Acrylics on Canvas',
    year: 2025,
    price: 0,
    img: '/artworks/orchid-bloom.webp',
    imgAspect: '2/3',
    tag: 'Available',
    dimensions: '24×35 inches',
    style: 'Abstract',
    story: {
      chapter1: {
        heading: 'The Moment of Opening',
        body: 'A bloom is not a static thing. It is a motion caught mid-gesture — the slow unfurling of petals that takes days but feels, when you are watching, like it is happening in real time. This painting attempts to hold that moment.',
      },
      chapter2: {
        heading: 'Between Representation and Abstraction',
        body: 'Orchid Bloom is not a portrait of a flower — it is what a flower feels like when you are very close to it. The forms are loosened from their botany, freed into something that carries the feeling without the description.',
      },
      chapter3: {
        heading: 'The Vertical Format',
        body: 'At 24×35 inches, the proportions echo the way flowers actually stand — upright, self-contained, reaching. The format is not incidental; it is part of what the painting says.',
      },
      chapter4: {
        heading: 'Pink, White, Shadow',
        body: 'The palette is delicate but not precious. There is depth in the shadows, tension in the places where soft pink meets a harder edge. Delicacy and strength occupy the same canvas.',
      },
      chapter5: {
        heading: 'A Gift of Colour',
        body: 'Orchid Bloom is the painting for a space that needs warmth without weight, colour without noise. It gives to a room the way flowers do — quietly and with great generosity.',
      },
    },
  },
  {
    id: 'echoes-in-texture',
    title: 'Echoes in Texture',
    medium: 'Acrylics on Canvas',
    year: 2024,
    price: 0,
    img: '/artworks/echoes-in-texture.webp',
    imgAspect: '5/4',
    tag: 'Available',
    dimensions: '16×16 inches',
    style: 'Abstract',
    story: {
      chapter1: {
        heading: 'The Square',
        body: 'The square format is a statement of equality — no axis dominates, no direction is privileged. Within this symmetry, everything becomes about the surface itself: the marks, the layers, the accumulated texture.',
      },
      chapter2: {
        heading: 'Texture as Voice',
        body: 'In Echoes in Texture, the surface is the subject. Layers of acrylic were built up, scraped back, built again — each action leaving its trace, each trace becoming part of a larger conversation between what was and what is.',
      },
      chapter3: {
        heading: 'The Echo',
        body: 'An echo is not the original sound — it is the sound after the source has gone, changed by the space it has travelled through. The marks in this painting echo each other: similar but never identical, repeating but never exactly.',
      },
      chapter4: {
        heading: 'Small Scale, Deep Attention',
        body: 'At 16×16 inches, this work rewards closeness. The detail reveals itself only to those who come near — the small painting that holds more than its size suggests.',
      },
      chapter5: {
        heading: 'A Surface Worth Living With',
        body: 'Echoes in Texture is the kind of work that shows you something new each time you look. It is not solved in one viewing — it opens slowly, the way all textured things do.',
      },
    },
  },
  {
    id: 'muted-grace',
    title: 'Muted Grace',
    medium: 'Gouache on Sheet',
    year: 2025,
    price: 0,
    img: '/artworks/muted-grace.webp',
    imgAspect: '2/3',
    tag: 'Available',
    dimensions: '16×24 inches',
    style: 'Figurative',
    story: {
      chapter1: {
        heading: 'Gouache and the Figure',
        body: 'Gouache is an unforgiving medium. Its opacity means every mark is visible — there is no layering over a mistake, no transparency to hide behind. Painting a figure in gouache is an act of commitment.',
      },
      chapter2: {
        heading: 'Muted',
        body: 'The muted palette is not a limitation — it is a choice. Bright colours announce themselves; muted ones invite. This painting does not call across the room. It waits, and rewards those who come to it.',
      },
      chapter3: {
        heading: 'The Grace of Restraint',
        body: 'Grace, in painting as in movement, is not absence of effort — it is effort so complete that the effort disappears. Muted Grace attempts that: the figure rendered with precision that reads as ease.',
      },
      chapter4: {
        heading: 'Paper as Ground',
        body: 'Painted on sheet rather than canvas, Muted Grace has a different intimacy from the larger works — closer to drawing, more immediate, more private. The format belongs to a tradition of intimate figuration.',
      },
      chapter5: {
        heading: 'Quietude',
        body: 'This is a painting for a personal space. A study, a bedroom, a place of reflection. Its scale and palette speak of interiority — the inner life made briefly visible in colour and line.',
      },
    },
  },
  {
    id: 'crimson-whispers',
    title: 'Crimson Whispers',
    medium: 'Acrylics on Canvas',
    year: 2025,
    price: 0,
    img: '/artworks/crimson-whispers.webp',
    imgAspect: '3/4',
    tag: 'Featured',
    dimensions: '16×24 inches',
    style: 'Contemporary Impressionist Floral',
    story: {
      chapter1: {
        heading: 'The Red That Speaks Softly',
        body: 'Crimson in painting usually announces itself. Here it whispers — present everywhere but never overwhelming, a warmth distributed through the canvas the way heat is distributed through a room.',
      },
      chapter2: {
        heading: 'The Impressionist Inheritance',
        body: 'Contemporary Impressionist Floral is a tradition that carries Monet and Renoir forward without copying them. The impulse is the same: to capture not the flower but the feeling of the flower, the atmosphere that surrounds it.',
      },
      chapter3: {
        heading: 'Floral as Abstract',
        body: 'Looked at closely, the marks are not petals — they are gestures that carry the memory of petals. The painting operates at the boundary between recognition and sensation: you know what it is before you can say why.',
      },
      chapter4: {
        heading: 'The Small Canvas',
        body: 'At 16×24 inches, Crimson Whispers is intimate in scale but not in presence. It holds its warmth in a concentrated form — the way a single red flower in a room changes the temperature of the light.',
      },
      chapter5: {
        heading: 'What Whispers Carry',
        body: 'A whisper requires closeness. Crimson Whispers is a painting that draws you in — that wants you near, that gives more the closer you come. A painting to live with, not simply to look at.',
      },
    },
  },
  {
    id: 'floral-study',
    title: 'Floral Study',
    medium: 'Acrylics on Canvas',
    year: 2025,
    price: 0,
    img: '/artworks/floral-study.webp',
    imgAspect: '4/5',
    tag: 'Available',
    dimensions: '18×36 inches',
    style: 'Contemporary Impressionist Floral',
    story: {
      chapter1: {
        heading: 'The Devotion of Looking',
        body: 'A study, in the tradition of painting, is an act of attention. Not a finished statement but a sustained looking — the artist returning again and again to the same subject until they understand not just what it looks like but what it is.',
      },
      chapter2: {
        heading: 'The Tall Format',
        body: 'At 18×36 inches, the canvas is vertical in the way flowers are vertical — upright, reaching, growing. The format does not merely contain the subject; it participates in it.',
      },
      chapter3: {
        heading: 'Loose and Precise',
        body: 'Contemporary Impressionist Floral painting holds a productive tension: marks that are loose enough to feel alive, precise enough to remain legible. Each brushstroke is both gesture and observation.',
      },
      chapter4: {
        heading: 'Colour as Season',
        body: 'The palette of Floral Study carries the particular warmth of a season in full bloom — generous, layered, unguarded. These are colours that do not apologise for their beauty.',
      },
      chapter5: {
        heading: 'What a Study Becomes',
        body: 'A study begins as practice and sometimes arrives at something the more finished work could not. Floral Study is that kind of work — made with the freedom of an exercise and the depth of a painting that knows what it wants to say.',
      },
    },
  },
  {
    // TODO(jahnvi): title/medium/year/price/dimensions below are PLACEHOLDERS
    // assigned from the photo — replace with the real values before publishing.
    id: 'ocean-shore-round',
    title: 'Ocean Shore',
    medium: 'Texture Art',
    year: 2026,
    price: 0,
    img: '/artworks/ocean-shore-round.webp',
    imgAspect: '1/1',
    tag: 'Featured',
    dimensions: '',
    style: 'Texture',
    story: {
      chapter1: { heading: '', body: '' },
      chapter2: { heading: '', body: '' },
      chapter3: { heading: '', body: '' },
      chapter4: { heading: '', body: '' },
      chapter5: { heading: '', body: '' },
    },
  },
  {
    // TODO(jahnvi): title/medium/year/price/dimensions below are PLACEHOLDERS
    // assigned from the photo — replace with the real values before publishing.
    id: 'cobalt-wave-round',
    title: 'Cobalt Wave',
    medium: 'Texture Art',
    year: 2026,
    price: 0,
    img: '/artworks/cobalt-wave-round.webp',
    imgAspect: '1/1',
    tag: 'Featured',
    dimensions: '',
    style: 'Texture',
    story: {
      chapter1: { heading: '', body: '' },
      chapter2: { heading: '', body: '' },
      chapter3: { heading: '', body: '' },
      chapter4: { heading: '', body: '' },
      chapter5: { heading: '', body: '' },
    },
  },
  {
    // TODO(jahnvi): title/medium/year/price/dimensions below are PLACEHOLDERS
    // assigned from the photo — replace with the real values before publishing.
    id: 'sea-shore-texture',
    title: 'Sea Shore',
    medium: 'Texture Art',
    year: 2026,
    price: 0,
    img: '/artworks/sea-shore-texture.webp',
    imgAspect: '5/6',
    tag: 'New',
    dimensions: '',
    style: 'Texture',
    story: {
      chapter1: { heading: '', body: '' },
      chapter2: { heading: '', body: '' },
      chapter3: { heading: '', body: '' },
      chapter4: { heading: '', body: '' },
      chapter5: { heading: '', body: '' },
    },
  },
  {
    // TODO(jahnvi): title/medium/year/price/dimensions below are PLACEHOLDERS
    // assigned from the photo — replace with the real values before publishing.
    id: 'pearl-blossom',
    title: 'Pearl Blossom',
    medium: 'Texture Art',
    year: 2026,
    price: 0,
    img: '/artworks/pearl-blossom.webp',
    imgAspect: '5/6',
    tag: 'New',
    dimensions: '',
    style: 'Texture',
    story: {
      chapter1: { heading: '', body: '' },
      chapter2: { heading: '', body: '' },
      chapter3: { heading: '', body: '' },
      chapter4: { heading: '', body: '' },
      chapter5: { heading: '', body: '' },
    },
  },
  {
    // TODO(jahnvi): title/medium/year/price/dimensions below are PLACEHOLDERS
    // assigned from the photo — replace with the real values before publishing.
    id: 'lotus-maiden-round',
    title: 'Lotus Maiden',
    medium: 'Portrait',
    year: 2026,
    price: 0,
    img: '/artworks/lotus-maiden-round.webp',
    imgAspect: '1/1',
    tag: 'Featured',
    dimensions: '',
    style: 'Figurative',
    story: {
      chapter1: { heading: '', body: '' },
      chapter2: { heading: '', body: '' },
      chapter3: { heading: '', body: '' },
      chapter4: { heading: '', body: '' },
      chapter5: { heading: '', body: '' },
    },
  },
  {
    // TODO(jahnvi): title/medium/year/price/dimensions below are PLACEHOLDERS
    // assigned from the photo — replace with the real values before publishing.
    id: 'golden-seams-round',
    title: 'Golden Seams',
    medium: 'Portrait',
    year: 2026,
    price: 0,
    img: '/artworks/golden-seams-round.webp',
    imgAspect: '1/1',
    tag: 'New',
    dimensions: '',
    style: 'Figurative',
    story: {
      chapter1: { heading: '', body: '' },
      chapter2: { heading: '', body: '' },
      chapter3: { heading: '', body: '' },
      chapter4: { heading: '', body: '' },
      chapter5: { heading: '', body: '' },
    },
  },
  {
    // TODO(jahnvi): title/medium/year/price/dimensions below are PLACEHOLDERS
    // assigned from the photo — replace with the real values before publishing.
    id: 'nandi-shivling',
    title: 'Nandi & Shivling',
    medium: 'Devotional',
    year: 2026,
    price: 0,
    img: '/artworks/nandi-shivling.webp',
    imgAspect: '3/4',
    tag: 'New',
    dimensions: '',
    style: 'Devotional',
    story: {
      chapter1: { heading: '', body: '' },
      chapter2: { heading: '', body: '' },
      chapter3: { heading: '', body: '' },
      chapter4: { heading: '', body: '' },
      chapter5: { heading: '', body: '' },
    },
  },
  {
    // TODO(jahnvi): title/medium/year/price/dimensions below are PLACEHOLDERS
    // assigned from the photo — replace with the real values before publishing.
    id: 'shrinathji-miniature',
    title: 'Shrinathji Miniature',
    medium: 'Pichwai',
    year: 2026,
    price: 0,
    img: '/artworks/shrinathji-miniature.webp',
    imgAspect: '3/4',
    tag: 'New',
    dimensions: '',
    style: 'Pichwai',
    story: {
      chapter1: { heading: '', body: '' },
      chapter2: { heading: '', body: '' },
      chapter3: { heading: '', body: '' },
      chapter4: { heading: '', body: '' },
      chapter5: { heading: '', body: '' },
    },
  },
  {
    // TODO(jahnvi): title/medium/year/price/dimensions below are PLACEHOLDERS
    // assigned from the photo — replace with the real values before publishing.
    id: 'pichwai-lotus-pink',
    title: 'Pichwai Lotus',
    medium: 'Pichwai',
    year: 2026,
    price: 0,
    img: '/artworks/pichwai-lotus-pink.webp',
    imgAspect: '3/4',
    tag: 'New',
    dimensions: '',
    style: 'Pichwai',
    story: {
      chapter1: { heading: '', body: '' },
      chapter2: { heading: '', body: '' },
      chapter3: { heading: '', body: '' },
      chapter4: { heading: '', body: '' },
      chapter5: { heading: '', body: '' },
    },
  },
  {
    // TODO(jahnvi): title/medium/year/price/dimensions below are PLACEHOLDERS
    // assigned from the photo — replace with the real values before publishing.
    id: 'jharokha-mural',
    title: 'Jharokha Mural',
    medium: 'Wall Art',
    year: 2026,
    price: 0,
    img: '/artworks/jharokha-mural.webp',
    imgAspect: '3/4',
    tag: 'New',
    dimensions: '',
    style: 'Mural',
    story: {
      chapter1: { heading: '', body: '' },
      chapter2: { heading: '', body: '' },
      chapter3: { heading: '', body: '' },
      chapter4: { heading: '', body: '' },
      chapter5: { heading: '', body: '' },
    },
  },
  {
    // Confirmed by Jahnvi: realistic 3D rakhi, commissioned for a govt employee.
    // TODO(jahnvi): year/price/dimensions still need real values.
    id: 'mahakal-rudraksha',
    title: 'Mahakal Rakhi',
    medium: '3D Rakhi — rudraksha, beadwork',
    year: 2026,
    price: 0,
    img: '/artworks/mahakal-rudraksha.webp',
    imgAspect: '16/9',
    tag: 'New',
    dimensions: '',
    style: 'Commission',
    story: {
      chapter1: { heading: '', body: '' },
      chapter2: { heading: '', body: '' },
      chapter3: { heading: '', body: '' },
      chapter4: { heading: '', body: '' },
      chapter5: { heading: '', body: '' },
    },
  },
  {
    // TODO(jahnvi): title/medium/year/price/dimensions are PLACEHOLDERS — replace before publishing.
    id: 'lotus-maiden-flat',
    title: 'Lotus Maiden',
    medium: 'Acrylics on Canvas',
    year: 2026,
    price: 0,
    img: '/artworks/lotus-maiden-flat.webp',
    imgAspect: '1/1',
    tag: 'Featured',
    dimensions: '',
    style: 'Figurative',
    story: {
      chapter1: { heading: '', body: '' },
      chapter2: { heading: '', body: '' },
      chapter3: { heading: '', body: '' },
      chapter4: { heading: '', body: '' },
      chapter5: { heading: '', body: '' },
    },
  },
  {
    // TODO(jahnvi): title/medium/year/price/dimensions are PLACEHOLDERS — replace before publishing.
    id: 'ocean-shore-large',
    title: 'Ocean Shore (Large)',
    medium: 'Texture Art',
    year: 2026,
    price: 0,
    img: '/artworks/ocean-shore-large.webp',
    imgAspect: '3/4',
    tag: 'New',
    dimensions: '',
    style: 'Texture',
    story: {
      chapter1: { heading: '', body: '' },
      chapter2: { heading: '', body: '' },
      chapter3: { heading: '', body: '' },
      chapter4: { heading: '', body: '' },
      chapter5: { heading: '', body: '' },
    },
  },
  {
    // Confirmed by Jahnvi: realistic 3D rakhi, commissioned for a govt employee.
    // TODO(jahnvi): year/price/dimensions still need real values.
    id: 'mahakal-rakhi-cord',
    title: 'Mahakal Rakhi — Detail',
    medium: '3D Rakhi — rudraksha, beadwork',
    year: 2026,
    price: 0,
    img: '/artworks/mahakal-rakhi-cord.webp',
    imgAspect: '7/10',
    tag: 'New',
    dimensions: '',
    style: 'Commission',
    story: {
      chapter1: { heading: '', body: '' },
      chapter2: { heading: '', body: '' },
      chapter3: { heading: '', body: '' },
      chapter4: { heading: '', body: '' },
      chapter5: { heading: '', body: '' },
    },
  },
  {
    // Confirmed by Jahnvi: hand-crafted shawl, painted with acrylic colours.
    // TODO(jahnvi): title/year/price/dimensions still need real values.
    id: 'shawl-kali',
    title: 'Painted Shawl — Kali',
    medium: 'Acrylic on hand-crafted shawl',
    year: 2026,
    price: 0,
    img: '/artworks/shawl-kali.webp',
    imgAspect: '3/4',
    tag: 'New',
    dimensions: '',
    style: 'Wearable Art',
    story: {
      chapter1: { heading: '', body: '' },
      chapter2: { heading: '', body: '' },
      chapter3: { heading: '', body: '' },
      chapter4: { heading: '', body: '' },
      chapter5: { heading: '', body: '' },
    },
  },
  {
    // Confirmed by Jahnvi: hand-crafted shawl, painted with acrylic colours.
    // TODO(jahnvi): title/year/price/dimensions still need real values.
    id: 'shawl-bhairav',
    title: 'Painted Shawl — Bhairav',
    medium: 'Acrylic on hand-crafted shawl',
    year: 2026,
    price: 0,
    img: '/artworks/shawl-bhairav.webp',
    imgAspect: '3/4',
    tag: 'New',
    dimensions: '',
    style: 'Wearable Art',
    story: {
      chapter1: { heading: '', body: '' },
      chapter2: { heading: '', body: '' },
      chapter3: { heading: '', body: '' },
      chapter4: { heading: '', body: '' },
      chapter5: { heading: '', body: '' },
    },
  },
  {
    // Content written from the photograph; facts confirmed by Jahnvi where noted.
    // TODO(jahnvi): year/price/dimensions still need real values.
    id: 'shringar-ganesh-maroon',
    title: 'Khajrana Shringar — Maroon & Gold',
    medium: 'Shringar — fabric, beadwork, floral',
    year: 2026,
    price: 0,
    img: '/artworks/shringar-ganesh-maroon.webp',
    imgAspect: '3/4',
    tag: 'Featured',
    dimensions: '',
    style: 'Shringar',
    story: {
      chapter1: { heading: 'A Commission at Khajrana', body: 'The shringar for the deity at Khajrana Ganesh Mandir, Indore — one of the most visited temples in Madhya Pradesh. The work is devotional service as much as design: it is seen by thousands of devotees in a single day.' },
      chapter2: { heading: 'Working in Maroon and Gold', body: 'Deep maroon velvet forms the ground, chosen to hold light in a space lit largely by lamps. Gold and pearl detailing traces the form of the deity, with the trunk and crown picked out so they read clearly from a distance.' },
      chapter3: { heading: 'Built for the Distance', body: 'Every decision answers a practical question: what survives being viewed from twenty feet, in low light, by a moving crowd. Scale, contrast and placement matter more here than fine detail.' },
      chapter4: { heading: 'Flowers as Frame', body: 'Fresh marigold and rose garlands complete the composition. They are not decoration added afterwards — the fabric work is designed around where the flowers will fall.' },
      chapter5: { heading: 'Impermanent by Design', body: 'A shringar lasts a day. It is dressed, seen, and dismantled. The discipline of making something this considered, knowing it is temporary, is its own kind of practice.' },
    },
  },
  {
    // Content written from the photograph; facts confirmed by Jahnvi where noted.
    // TODO(jahnvi): year/price/dimensions still need real values.
    id: 'shringar-full-altar',
    title: 'Khajrana Shringar — The Altar',
    medium: 'Shringar — fabric, beadwork, floral',
    year: 2026,
    price: 0,
    img: '/artworks/shringar-full-altar.webp',
    imgAspect: '4/3',
    tag: 'New',
    dimensions: '',
    style: 'Shringar',
    story: {
      chapter1: { heading: 'The Full Setting', body: 'The complete altar view, showing the shringar in context — the silver prabhavali behind, attendant figures either side, and the row of oil lamps at the base.' },
      chapter2: { heading: 'Composition at Scale', body: 'Seen whole, the work reads as a single composition. The orange of the deity is the focal point, deliberately warm against the cool silver surround.' },
      chapter3: { heading: 'Symmetry and Its Breaks', body: 'The arrangement is broadly symmetrical, with small deliberate variations — a garland falling differently on one side, lamps placed by hand rather than measured.' },
      chapter4: { heading: 'Made in Situ', body: 'Shringar cannot be built in a studio and installed. It is assembled at the altar, in the hours before darshan, working around the fixed architecture of the shrine.' },
      chapter5: { heading: 'A Living Frame', body: 'The lamps, the flowers, and the crowd complete it. This is art that exists inside a ritual rather than on a wall.' },
    },
  },
  {
    // Content written from the photograph; facts confirmed by Jahnvi where noted.
    // TODO(jahnvi): year/price/dimensions still need real values.
    id: 'shringar-tilak',
    title: 'Khajrana Shringar — Tilak Detail',
    medium: 'Shringar — fabric, beadwork, floral',
    year: 2026,
    price: 0,
    img: '/artworks/shringar-tilak.webp',
    imgAspect: '2/3',
    tag: 'New',
    dimensions: '',
    style: 'Shringar',
    story: {
      chapter1: { heading: 'The Detail Up Close', body: 'A closer view of the tilak and facial detailing — the third eye, the painted motifs, and the fine work that is invisible from the back of the hall but present for those who come near.' },
      chapter2: { heading: 'Two Distances', body: 'Devotional work is made for two viewers at once: the one at the rail and the one at the doorway. This detail answers the first.' },
      chapter3: { heading: 'Colour Against Saffron', body: 'Saffron dominates, with black, green and blue used sparingly. Restraint keeps the face legible rather than busy.' },
      chapter4: { heading: 'Hand-Placed', body: 'Each element is set by hand, on the day, without a template. Small asymmetries are the mark of that method, not a flaw in it.' },
      chapter5: { heading: 'Seen by Thousands', body: 'At Khajrana, the audience is not a gallery. It is a queue that does not stop.' },
    },
  },
  {
    // Content written from the photograph; facts confirmed by Jahnvi where noted.
    // TODO(jahnvi): year/price/dimensions still need real values.
    id: 'wall-banana-palm',
    title: 'Banana Palm — Stairwell Mural',
    medium: 'Acrylic on wall',
    year: 2026,
    price: 0,
    img: '/artworks/wall-banana-palm.webp',
    imgAspect: '6/13',
    tag: 'New',
    dimensions: '',
    style: 'Mural',
    story: {
      chapter1: { heading: 'Painting the Architecture', body: 'A mural for a domestic stairwell — the kind of wall that is passed rather than paused at. The composition is built to be read in motion, from below and while climbing.' },
      chapter2: { heading: 'The Terracotta Arch', body: 'A painted terracotta arch anchors the piece, giving the palm a frame and lifting it off the grey wall. Without it the greens would sink into the surrounding paint.' },
      chapter3: { heading: 'Leaf by Leaf', body: 'Banana leaves are painted individually, each with its own vein structure and torn edge. The variation is what stops a repeated form from reading as wallpaper.' },
      chapter4: { heading: 'Working Vertically', body: 'A stairwell offers no comfortable working position. The piece is painted in sections from a ladder, stepping back constantly to check proportion.' },
      chapter5: { heading: 'Permanent Work', body: 'Unlike canvas, a mural cannot be moved, resold, or reframed. It belongs to the building.' },
    },
  },
];

export const featuredArtworks = artworks.filter(a => a.tag === 'Featured' || a.tag === 'New').slice(0, 3);
