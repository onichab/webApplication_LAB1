require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// --- Health check ---
// Used to verify the API is running and reachable from the frontend.
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'uniswap-backend',
    timestamp: new Date().toISOString()
  });
});

// Future route mounts will go here, e.g.:
// app.use('/api/auth', require('./routes/auth.routes'));
// app.use('/api/products', require('./routes/products.routes'));
// app.use('/api/categories', require('./routes/categories.routes'));

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`UniSwap backend running on http://localhost:${PORT}`);
});
