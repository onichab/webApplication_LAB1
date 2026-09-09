// Mock data for Stage 2 — no backend wiring yet (that's Stage 9-10).
// icon refers to a lucide-react icon name resolved in src/utils/icons.js

export const products = [
  {
    id: 1,
    name: 'Casio FX-991ES Plus',
    category: 'Study Equipment',
    price: 2500,
    seller: 'Amara K.',
    sellerJoined: 'Member since 2023',
    sellerRating: 4.9,
    condition: 'Like New',
    stock: 3,
    rating: 4.8,
    icon: 'Calculator',
    description:
      'Barely used scientific calculator, perfect for engineering and stats modules. Comes with the original case and manual. No scratches on the screen.'
  },
  {
    id: 2,
    name: 'Programming Textbook',
    category: 'Books & Notes',
    price: 1800,
    seller: 'Dinuka P.',
    sellerJoined: 'Member since 2022',
    sellerRating: 4.7,
    condition: 'Good',
    stock: 2,
    rating: 4.6,
    icon: 'BookOpen',
    description:
      'Core programming textbook used for the second-year module. Some highlighting in the first three chapters, otherwise in good condition. Great for anyone taking the course next semester.'
  },
  {
    id: 3,
    name: 'Wireless Headphones',
    category: 'Electronics',
    price: 6500,
    seller: 'Sasindu R.',
    sellerJoined: 'Member since 2024',
    sellerRating: 5.0,
    condition: 'Like New',
    stock: 1,
    rating: 4.9,
    icon: 'Headphones',
    description:
      'Over-ear wireless headphones with active noise cancelling — great for studying in the library or on the bus. Battery still holds a full day of use. Selling because I upgraded models.'
  },
  {
    id: 4,
    name: 'Laptop',
    category: 'Electronics',
    price: 145000,
    seller: 'Nethmi F.',
    sellerJoined: 'Member since 2021',
    sellerRating: 4.8,
    condition: 'Good',
    stock: 1,
    rating: 4.7,
    icon: 'Laptop',
    description:
      'Reliable laptop, great for coursework and light coding. Minor cosmetic wear on the lid, screen and keyboard are in great shape. Charger included.'
  },
  {
    id: 5,
    name: 'Lecture Notes — Data Structures',
    category: 'Books & Notes',
    price: 500,
    seller: 'Kavindu S.',
    sellerJoined: 'Member since 2023',
    sellerRating: 4.6,
    condition: 'New',
    stock: 5,
    rating: 4.5,
    icon: 'NotebookText',
    description:
      'Hand-written and typed lecture notes covering the full Data Structures module, including diagrams and past-paper summaries. Printed copies, unused.'
  },
  {
    id: 6,
    name: 'Scientific Calculator',
    category: 'Study Equipment',
    price: 3200,
    seller: 'Ishara W.',
    sellerJoined: 'Member since 2020',
    sellerRating: 4.4,
    condition: 'Fair',
    stock: 4,
    rating: 4.3,
    icon: 'Calculator',
    description:
      'Fully functional scientific calculator with some visible wear on the casing from daily use. All buttons and functions work perfectly.'
  }
];

// Subset shown in the Best Sellers section
export const bestSellers = [products[2], products[3], products[0], products[4]];
