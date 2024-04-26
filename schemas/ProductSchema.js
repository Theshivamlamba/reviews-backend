var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description:
  {
    ram: { type: String, required: true },
    storage: { type: String, required: true },
    color: { type: String, required: true },
  },
  price: { type: String, required: true },
  amazonLink: { type: String, required: true },
  flipkartLink: { type: String, required: true },
}, { timestamps: true });


module.exports = mongoose.model('Product', productSchema);