require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
// Increase payload limit to accept base64 image strings
app.use(express.json({ limit: '10mb' }));
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// --- Health check ---
// Used to verify the API is running and reachable from the frontend.
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'uniswap-backend',
    timestamp: new Date().toISOString()
  });
});

const { initDatabase } = require('./config/json-db');

// Initialize Database
initDatabase();

// Mount Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/products', require('./routes/products.routes'));

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`UniSwap backend running on http://localhost:${PORT}`);
});
