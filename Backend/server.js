const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require('./routes/userRoutes');
const carRoutes = require('./routes/carRoutes');

app.use('/api/users', userRoutes);
app.use('/api/cars', carRoutes);

// Connect to DB
mongoose.connect(process.env.MONGO_URI, 
).then(() =>
    console.log('Connected to DB'))

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
