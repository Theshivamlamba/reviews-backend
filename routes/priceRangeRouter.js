const express = require('express');
const router = express.Router();
const PriceRange = require('../schemas/PriceRangeSchema');

// Define route to handle POST requests to add a new priceRange
router.post('/priceRanges/addpriceRange', async (req, res) => {
    try {
        // Create a new instance of priceRange model with data from request body
        const newpriceRange = new PriceRange(req.body);

        // Save the new priceRange to the database
        await newpriceRange.save();

        // Respond with success message
        res.status(201).json({ message: 'Price Range added successfully', priceRange: newpriceRange });
    } catch (error) {
        // Handle errors
        console.error('Error adding priceRange:', error);
        res.status(500).json({ error: 'Failed to add priceRange' });
    }
})

// Get All priceRanges or a fixed price range
router.get('/priceRanges/:id?', async (req, res) => {
    try {
        const id = req.params.id; // Extract the id from the request parameters
        if (!id) {
            // If id is not provided, return all priceRanges
            const priceRanges = await PriceRange.find();
            res.json(priceRanges);
        } else {
            // If id is provided, find the priceRange with that id
            const priceRange = await PriceRange.findById(id);
            if (!priceRange) {
                // If no priceRange found with the provided id, return 404
                res.status(404).json({ error: 'priceRange not found' });
            } else {
                // If priceRange found, return it
                res.json(priceRange);
            }
        }
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Define route to handle POST requests to add a new priceRange
router.post('/priceRanges/:priceRangeId/addFeature', async (req, res) => {
    const { priceRangeId } = req.params;
    const { featureName, productId } = req.body;

    try {

        // Find the price range by ID
        const priceRange = await PriceRange.findById(priceRangeId);

        if (!priceRange) {
            return res.status(404).json({ message: 'Price range not found, Create a Price Range First' });
        }

        // Check if feature with the same name already exists
        const existingFeature = priceRange.features.find(feature => feature.featureName === featureName);
        if (existingFeature) {
            return res.status(400).json({ message: 'Feature with the same name already exists in the price range', priceRange: priceRange });
        }

        // Add the feature to the price range
        priceRange.features.push({ featureName, productId });
        await priceRange.save();

        res.status(200).json({ message: 'New Feature added to price range successfully', priceRange });
    } catch (error) {
        console.error('Error adding feature to price range:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
