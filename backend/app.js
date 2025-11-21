const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const linkRoutes = require('./routes/linkRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Health
app.get('/health', (req, res) => {
  res.json({ ok: true, version: process.env.APP_VERSION || '1.0' });
});

// API
app.use('/api', linkRoutes);

module.exports = app;
