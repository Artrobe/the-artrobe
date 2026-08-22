export const INSTAGRAM_HANDLE = 'the.artrobe';

// Full profile URL with tracking params (used in Footer / Contact link buttons)
export const INSTAGRAM_PROFILE =
  'https://www.instagram.com/the.artrobe?igsh=MTV2Y3F6Zmh3NzAzaQ%3D%3D&utm_source=qr';

// Clean profile URL (used for schema.org sameAs / plain links)
export const INSTAGRAM_URL = 'https://www.instagram.com/the.artrobe';

export const CONTACT_EMAIL = 'theartrobe12@gmail.com';

// From the Google Business Profile: 078800 93155 (Indore).
// NOTE: verify this number is WhatsApp-enabled before relying on the widget —
// a landline or non-WhatsApp mobile will silently fail for visitors.
export const WHATSAPP_NUMBER = '917880093155';

// Google Business Profile — The Artrobe, Ashish Nagar Rd, Indore MP 452016
export const BUSINESS = {
  name: 'The Artrobe',
  phone: '+91 78800 93155',
  street: 'Ashish Nagar Rd, Ashish Nagar',
  city: 'Indore',
  region: 'Madhya Pradesh',
  postalCode: '452016',
  country: 'IN',
};

// Prefilled WhatsApp enquiry link builder.
export const waEnquiry = (text: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

// TODO: replace with the real Google Form (or Formspree) endpoint for subscribe capture.
// Google Form: use the /formResponse action URL; entry IDs below must match the form fields.
export const SUBSCRIBE_FORM = {
  action: 'https://docs.google.com/forms/d/e/REPLACE_WITH_FORM_ID/formResponse',
  fields: {
    name: 'entry.0000000001',
    email: 'entry.0000000002',
    phone: 'entry.0000000003',
    city: 'entry.0000000004',
  },
};

export const SOCIAL_LINKS = [
  { id: 'ig', label: 'Instagram', href: INSTAGRAM_PROFILE },
  { id: 'pt', label: 'Pinterest', href: 'https://pinterest.com/' },
  { id: 'yt', label: 'YouTube', href: 'https://youtube.com/' },
  { id: 'be', label: 'Behance', href: 'https://behance.net/' },
];

// Confirmed @the.artrobe reels only.
export const HOME_REELS = [
  'https://www.instagram.com/reel/DTdOquZDKgN/',
  'https://www.instagram.com/reel/DaK8WoHs329/',
];

export const WORKSHOP_REELS = [
  'https://www.instagram.com/reel/DZ46LUKMEMM/',
  'https://www.instagram.com/reel/DZ7hGwUqW66/',
];
