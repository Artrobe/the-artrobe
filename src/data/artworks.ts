export interface Artwork {
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

export const artworks: Artwork[] = [
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
];

export const featuredArtworks = artworks.filter(a => a.tag === 'Featured' || a.tag === 'New').slice(0, 3);
