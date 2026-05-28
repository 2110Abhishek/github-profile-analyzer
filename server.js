const express = require('express');
const cors = require('cors');
require('dotenv').config({ override: true });

const profileRoutes = require('./routes/profileRoutes');
const pool = require('./config/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test DB Connection
pool.getConnection()
  .then((connection) => {
    console.log('Connected to MySQL database successfully!');
    connection.release();
  })
  .catch((err) => {
    console.error('Error connecting to MySQL database:', err.message);
  });

// Routes
app.use('/api/profiles', profileRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('GitHub Profile Analyzer API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
