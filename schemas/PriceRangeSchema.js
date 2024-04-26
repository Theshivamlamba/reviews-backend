var mongoose = require('mongoose');

var priceRangeSchema = new mongoose.Schema({
   rangeValue: { type: String, required: true },
   features: [
      {
         featureName: String,
         productId: String,
      }
   ]

}, { timestamps: true });


module.exports = mongoose.model('PriceRange', priceRangeSchema);