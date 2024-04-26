const express = require('express');
const router = express.Router();
const Product = require('../schemas/ProductSchema');
// Define route to handle POST requests to add a new product
router.post('/products/addProduct', async (req, res) => {
    try {
        // Create a new instance of AddProduct model with data from request body
        const newProduct = new Product(req.body);

        // Save the new product to the database
        await newProduct.save();

        // Respond with success message
        res.status(201).json({ message: 'Product added successfully', product: newProduct });
    } catch (error) {
        // Handle errors
        console.error('Error adding product:', error);
        res.status(500).json({ error: 'Failed to add product' });
    }
})

// Get All Products 
router.get('/products/:id?', async (req, res) => {
    try {
        const id = req.params.id; // Extract the id from the request parameters
        if (!id) {
            // If id is not provided, return all products
            const products = await Product.find();
            res.json(products);
        } else {
            // If id is provided, find the product with that id
            const product = await Product.findById(id);
            if (!product) {
                // If no product found with the provided id, return 404
                res.status(404).json({ error: 'Product not found' });
            } else {
                // If product found, return it
                res.json(product);
            }
        }
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
