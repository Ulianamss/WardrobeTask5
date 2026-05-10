// Mock users login simulation
export const MOCK_USERS = [
  {
    id: 1,
    email: 'user@example.com',
    password: 'password123', 
    name: 'Uliana',
    bio: 'Model',
    favoriteStyle: 'Strict',
  },
];

// Mock clothes items
export const MOCK_CLOTHES = [
  {
    id: 1,
    userId: 1,
    name: 'Blue Jeans',
    category: 'bottoms',
    color: 'blue',
    season: 'all-season',
    shopLink: 'https://www.levi.com/NL/en/clothing/women/jeans/straight/501-90s-lightweight-jeans/p/A84210017',
    image: null,
    createdAt: new Date('2026-01-01'),
  },
  {
    id: 2,
    userId: 1,
    name: 'White T-Shirt',
    category: 'tops',
    color: 'white',
    season: 'all-season',
    image: null,
    createdAt: new Date('2026-01-02'),
  },
];

// Mock looks/outfits
export const MOCK_LOOKS = [
  {
    id: 1,
    userId: 1,
    name: 'Casual Friday',
    itemIds: [1, 2],
    createdAt: new Date('2026-01-03'),
  },
];

// Mock wishlist
export const MOCK_WISHLIST = [
  {
    id: 1,
    userId: 1,
    name: 'White Blazer',
    category: 'Event',
    color: 'white',
    link: 'https://example.com',
    createdAt: new Date('2026-01-04'),
  },
];