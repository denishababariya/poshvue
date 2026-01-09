require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const path = require('path')

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:3000').split(',').filter(Boolean);
app.use(cors({ origin: allowedOrigins.length ? allowedOrigins : true, credentials: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('MONGO_URI not found in environment variables.');
  process.exit(1);
}

mongoose.set('strictQuery', false);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');

    // Simple health route
    app.get('/', (req, res) => {
      res.send('Poshvue backend is running and MongoDB is connected');
    });
    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

    // Mount API routes
    const apiRouter = require('./routes');
    app.use('/api', apiRouter);
    
    

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
  });

module.exports = app;