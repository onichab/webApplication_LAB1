const express = require('express');
const router = express.Router();
const { readDB, writeDB } = require('../config/json-db');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key';

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ error: 'Invalid token' });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

router.get('/', (req, res) => {
  try {
    const db = readDB();
    const result = db.products.map(p => {
      const seller = db.users.find(u => u.id === p.seller_id);
      return {
        ...p,
        seller: seller ? seller.username : 'Unknown',
        sellerJoined: seller ? seller.joined_date : 'Unknown',
        sellerRating: seller ? seller.rating : 0
      };
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

router.get('/:id', (req, res) => {
  try {
    const db = readDB();
    const p = db.products.find(prod => prod.id.toString() === req.params.id);
    if (!p) {
      return res.status(404).json({ error: 'Product not found' });
    }
    const seller = db.users.find(u => u.id === p.seller_id);
    res.json({
      ...p,
      seller: seller ? seller.username : 'Unknown',
      sellerJoined: seller ? seller.joined_date : 'Unknown',
      sellerRating: seller ? seller.rating : 0
    });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

const fs = require('fs');
const path = require('path');

router.post('/', authenticate, (req, res) => {
  const { name, category, price, condition, stock, icon, image, description, universityId, roomNumber, contactNumber } = req.body;
  const seller_id = req.user.userId;

  if (!name || !category || !price || !universityId) {
    return res.status(400).json({ error: 'Missing required fields. Ensure universityId is provided.' });
  }

  try {
    let finalImageUrl = image || null;
    
    // If the image is a base64 string, parse and save it
    if (image && image.startsWith('data:image')) {
      const matches = image.match(/^data:image\/([A-Za-z-+\/]+);base64,(.+)$/);
      if (matches && matches.length === 3) {
        const ext = matches[1] === 'jpeg' ? 'jpg' : matches[1];
        const buffer = Buffer.from(matches[2], 'base64');
        const filename = `img_${Date.now()}_${Math.random().toString(36).substring(7)}.${ext}`;
        const filepath = path.join(__dirname, '../../uploads', filename);
        fs.writeFileSync(filepath, buffer);
        finalImageUrl = `http://localhost:5000/uploads/${filename}`;
      }
    }

    const db = readDB();
    const newId = db.products.length > 0 ? Math.max(...db.products.map(p => p.id)) + 1 : 1;
    
    const newProduct = {
      id: newId,
      name,
      category,
      price,
      seller_id,
      university_id: universityId,
      room_number: roomNumber || '',
      contact_number: contactNumber || '',
      condition: condition || 'Good',
      stock: stock || 1,
      rating: 0,
      icon: icon || 'Package',
      image: finalImageUrl,
      description: description || ''
    };

    db.products.push(newProduct);
    writeDB(db);

    res.status(201).json({ message: 'Product created', productId: newId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

router.delete('/:id', authenticate, (req, res) => {
  try {
    const db = readDB();
    const productIndex = db.products.findIndex(p => p.id.toString() === req.params.id);
    
    if (productIndex === -1) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    if (db.products[productIndex].seller_id !== req.user.userId) {
      return res.status(403).json({ error: 'You are not authorized to delete this product' });
    }

    db.products.splice(productIndex, 1);
    writeDB(db);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

router.patch('/:id', authenticate, (req, res) => {
  try {
    const { stock } = req.body;
    if (stock === undefined) {
      return res.status(400).json({ error: 'Missing stock field' });
    }

    const db = readDB();
    const product = db.products.find(p => p.id.toString() === req.params.id);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    if (product.seller_id !== req.user.userId) {
      return res.status(403).json({ error: 'You are not authorized to edit this product' });
    }

    product.stock = stock;
    writeDB(db);
    res.json({ message: 'Product updated', product });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

router.post('/buy', (req, res) => {
  try {
    const { items } = req.body;
    if (!items || !Array.isArray(items)) {
      return res.status(400).json({ error: 'Invalid payload' });
    }

    const db = readDB();
    const purchasedProducts = [];

    // Check stock for all items first
    for (const item of items) {
      const product = db.products.find(p => p.id === item.id);
      if (!product) {
        return res.status(404).json({ error: `Product ${item.id} not found` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ error: `Not enough stock for ${product.name}` });
      }
      purchasedProducts.push({ product, quantity: item.quantity });
    }

    // Deduct stock
    purchasedProducts.forEach(({ product, quantity }) => {
      product.stock -= quantity;
    });

    writeDB(db);
    res.json({ message: 'Purchase successful' });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
