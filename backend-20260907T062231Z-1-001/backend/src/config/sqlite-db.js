const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../../database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Could not connect to SQLite database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

function initDatabase() {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        joined_date TEXT,
        rating REAL DEFAULT 5.0
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        price REAL NOT NULL,
        seller_id INTEGER NOT NULL,
        condition TEXT,
        stock INTEGER DEFAULT 1,
        rating REAL DEFAULT 0,
        icon TEXT,
        description TEXT,
        FOREIGN KEY (seller_id) REFERENCES users(id)
      )
    `);

    // Seed mock data if products table is empty
    db.get('SELECT COUNT(*) as count FROM products', (err, row) => {
      if (!err && row.count === 0) {
        console.log('Seeding initial mock data...');
        
        // Seed a default user for mock data
        const insertUser = db.prepare('INSERT INTO users (username, password, joined_date, rating) VALUES (?, ?, ?, ?)');
        insertUser.run('Amara K.', 'hashedpassword', 'Member since 2023', 4.9);
        insertUser.run('Dinuka P.', 'hashedpassword', 'Member since 2022', 4.7);
        insertUser.run('Sasindu R.', 'hashedpassword', 'Member since 2024', 5.0);
        insertUser.run('Nethmi F.', 'hashedpassword', 'Member since 2021', 4.8);
        insertUser.run('Kavindu S.', 'hashedpassword', 'Member since 2023', 4.6);
        insertUser.run('Ishara W.', 'hashedpassword', 'Member since 2020', 4.4);
        insertUser.finalize();

        // Seed products
        const insertProduct = db.prepare(`
          INSERT INTO products (name, category, price, seller_id, condition, stock, rating, icon, description) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);
        
        insertProduct.run('Casio FX-991ES Plus', 'Study Equipment', 2500, 1, 'Like New', 3, 4.8, 'Calculator', 'Barely used scientific calculator, perfect for engineering and stats modules. Comes with the original case and manual. No scratches on the screen.');
        insertProduct.run('Programming Textbook', 'Books & Notes', 1800, 2, 'Good', 2, 4.6, 'BookOpen', 'Core programming textbook used for the second-year module. Some highlighting in the first three chapters, otherwise in good condition. Great for anyone taking the course next semester.');
        insertProduct.run('Wireless Headphones', 'Electronics', 6500, 3, 'Like New', 1, 4.9, 'Headphones', 'Over-ear wireless headphones with active noise cancelling — great for studying in the library or on the bus. Battery still holds a full day of use. Selling because I upgraded models.');
        insertProduct.run('Laptop', 'Electronics', 145000, 4, 'Good', 1, 4.7, 'Laptop', 'Reliable laptop, great for coursework and light coding. Minor cosmetic wear on the lid, screen and keyboard are in great shape. Charger included.');
        insertProduct.run('Lecture Notes — Data Structures', 'Books & Notes', 500, 5, 'New', 5, 4.5, 'NotebookText', 'Hand-written and typed lecture notes covering the full Data Structures module, including diagrams and past-paper summaries. Printed copies, unused.');
        insertProduct.run('Scientific Calculator', 'Study Equipment', 3200, 6, 'Fair', 4, 4.3, 'Calculator', 'Fully functional scientific calculator with some visible wear on the casing from daily use. All buttons and functions work perfectly.');
        
        insertProduct.finalize();
        console.log('Mock data seeded.');
      }
    });
  });
}

module.exports = { db, initDatabase };
