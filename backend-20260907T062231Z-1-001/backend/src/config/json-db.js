const fs = require('fs');
const path = require('path');

const dbPath = path.resolve(__dirname, '../../database.json');

// Default initial data
const defaultData = {
  users: [
    { id: 1, username: 'Amara K.', password: 'hashedpassword', joined_date: 'Member since 2023', rating: 4.9 },
    { id: 2, username: 'Dinuka P.', password: 'hashedpassword', joined_date: 'Member since 2022', rating: 4.7 },
    { id: 3, username: 'Sasindu R.', password: 'hashedpassword', joined_date: 'Member since 2024', rating: 5.0 },
    { id: 4, username: 'Nethmi F.', password: 'hashedpassword', joined_date: 'Member since 2021', rating: 4.8 },
    { id: 5, username: 'Kavindu S.', password: 'hashedpassword', joined_date: 'Member since 2023', rating: 4.6 },
    { id: 6, username: 'Ishara W.', password: 'hashedpassword', joined_date: 'Member since 2020', rating: 4.4 }
  ],
  products: [
    { id: 1, name: 'Casio FX-991ES Plus', category: 'Study Equipment', price: 2500, seller_id: 1, condition: 'Like New', stock: 3, rating: 4.8, icon: 'Calculator', image: 'https://images.unsplash.com/photo-1574607383077-47ddc2dc51c4?w=500&q=80', description: 'Barely used scientific calculator...' },
    { id: 2, name: 'Programming Textbook', category: 'Books & Notes', price: 1800, seller_id: 2, condition: 'Good', stock: 2, rating: 4.6, icon: 'BookOpen', image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&q=80', description: 'Core programming textbook...' },
    { id: 3, name: 'Wireless Headphones', category: 'Electronics', price: 6500, seller_id: 3, condition: 'Like New', stock: 1, rating: 4.9, icon: 'Headphones', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80', description: 'Over-ear wireless headphones...' },
    { id: 4, name: 'Laptop', category: 'Electronics', price: 145000, seller_id: 4, condition: 'Good', stock: 1, rating: 4.7, icon: 'Laptop', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80', description: 'Reliable laptop, great for coursework...' },
    { id: 5, name: 'Lecture Notes — Data Structures', category: 'Books & Notes', price: 500, seller_id: 5, condition: 'New', stock: 5, rating: 4.5, icon: 'NotebookText', image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=500&q=80', description: 'Hand-written and typed lecture notes...' },
    { id: 6, name: 'Scientific Calculator', category: 'Study Equipment', price: 3200, seller_id: 6, condition: 'Fair', stock: 4, rating: 4.3, icon: 'Calculator', image: 'https://images.unsplash.com/photo-1611125832047-1d7ad1e8e48f?w=500&q=80', description: 'Fully functional scientific calculator...' },
    { id: 8, name: 'Premium Notebooks (Pack of 3)', category: 'Stationery', price: 800, seller_id: 1, condition: 'New', stock: 10, rating: 5.0, icon: 'PenTool', image: 'https://images.unsplash.com/photo-1531346878377-a541e4a0ecce?w=500&q=80', description: 'High quality ruled notebooks.' },
    { id: 9, name: 'Desk Lamp', category: 'Dorm Items', price: 1500, seller_id: 2, condition: 'Like New', stock: 1, rating: 4.8, icon: 'Sofa', image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500&q=80', description: 'Bright LED desk lamp.' },
    { id: 10, name: 'PS4 Controller', category: 'Entertainment', price: 4500, seller_id: 3, condition: 'Good', stock: 1, rating: 4.5, icon: 'Gamepad2', image: 'https://images.unsplash.com/photo-1526509867162-5b0c0d1b4b33?w=500&q=80', description: 'Used PS4 dualshock controller.' },
    { id: 11, name: 'Lab Coat', category: 'Other', price: 1200, seller_id: 4, condition: 'Good', stock: 2, rating: 4.2, icon: 'Boxes', image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=500&q=80', description: 'White lab coat, size Medium.' }
  ]
};

let dbCache = null;

function readDB() {
  if (dbCache) return dbCache;
  try {
    if (!fs.existsSync(dbPath)) {
      writeDB(defaultData);
      dbCache = defaultData;
      return defaultData;
    }
    const data = fs.readFileSync(dbPath, 'utf8');
    dbCache = JSON.parse(data);
    return dbCache;
  } catch (err) {
    console.error('Error reading DB:', err);
    return defaultData;
  }
}

function writeDB(data) {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
    dbCache = data;
  } catch (err) {
    console.error('Error writing DB:', err);
  }
}

function initDatabase() {
  console.log('Initializing JSON Database...');
  readDB(); // Creates file with defaults if it doesn't exist
}

module.exports = { readDB, writeDB, initDatabase };
