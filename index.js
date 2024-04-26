const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productsRouter');
const priceRangeRoutes = require('./routes/priceRangeRouter');
const PropertiesReader = require('properties-reader');

// Load the properties file
const properties = PropertiesReader('config.properties');
const port = properties.get('app.port');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect(properties.get('mongodbConnectionString'));

//Routes 
app.use('/api', productRoutes); 
app.use('/api', priceRangeRoutes); 

//Test Route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
