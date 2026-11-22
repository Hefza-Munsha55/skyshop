const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const products = [
  { _id: '1', title: 'Sky Blue Hoodie', price: 49, category: 'Fashion', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500' },
  { _id: '2', title: 'Cloud White Sneakers', price: 89, category: 'Shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500' },
  { _id: '3', title: 'Ocean Smart Watch', price: 129, category: 'Tech', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500' },
  { _id: '4', title: 'Sunny Backpack', price: 59, category: 'Fashion', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500' },
  { _id: '5', title: 'Aero Headphones', price: 99, category: 'Tech', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500' },
  { _id: '6', title: 'Breeze Sunglasses', price: 39, category: 'Fashion', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500' },
];

app.get('/api/products', (req, res) => { setTimeout(() => res.json(products), 1200); });
app.get('/api/products/search', (req, res) => {
  const q = (req.query.q || '').toLowerCase();
  const filtered = products.filter(p => p.title.toLowerCase().includes(q));
  setTimeout(() => res.json(filtered), 800);
});

// Local pe chalane ke liye - Vercel pe ye line ignore ho jayegi
if (require.main === module) {
  app.listen(5000, () => console.log('Server running on http://localhost:5000'));
}

module.exports = app;