// Verbatim Google reviews for The Artrobe (Ashish Nagar Rd, Indore).
// 5.0 average across 10 reviews as shown on the Google Business Profile.
// Text is quoted exactly as written by each reviewer — do not paraphrase or
// invent reviews. Add new ones only by copying them from the live profile.
export interface Review {
  name: string;
  when: string;
  stars: 5;
  text: string;
}

export const GOOGLE_RATING = 5.0;
export const GOOGLE_REVIEW_COUNT = 10;
export const GOOGLE_PROFILE_URL = 'https://www.google.com/search?q=The+Artrobe+Indore';

export const REVIEWS: Review[] = [
  {
    name: 'manisha pareek',
    when: '4 weeks ago',
    stars: 5,
    text: 'I had a wonderful experience with Artrobe! The workshops are thoughtfully conducted, engaging, and suitable for all skill levels. The instructor is patient, creative, and explains each step clearly, making learning both easy and enjoyable.',
  },
  {
    name: 'Idrees Kotawala',
    when: '4 weeks ago',
    stars: 5,
    text: 'Amazing experience at The Artrobe! The workshop was fun, well-organized, and easy to follow. Loved the creative atmosphere and learned something new. Highly recommended!',
  },
  {
    name: 'Astha MT',
    when: 'a month ago',
    stars: 5,
    text: 'An experience filled with colors, creativity, and beautiful memories. Met amazing people and created something special together. The Artrobe workshop was truly one to remember.',
  },
  {
    name: 'DHANANJAY Singh',
    when: '3 weeks ago',
    stars: 5,
    text: 'It was so amazing to attend the session, also commission work is very premium',
  },
  {
    name: 'Sneha Patel',
    when: 'a month ago',
    stars: 5,
    text: 'Really had a great experience working with Artrobe',
  },
  {
    name: 'Dog Training Indore Nachan',
    when: 'a month ago',
    stars: 5,
    text: 'One of the best art workshop experiences I’ve had. The session was engaging, fun, and perfect even for beginners. Highly recommend The Artrobe to anyone who loves art',
  },
];
