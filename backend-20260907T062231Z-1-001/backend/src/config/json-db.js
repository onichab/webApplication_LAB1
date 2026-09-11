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
  products: []
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
