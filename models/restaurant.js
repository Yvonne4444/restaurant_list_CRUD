const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  google_map: {
    type: String,
    required: false,
  },
  rating: {
    type: Number,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
})
module.exports = mongoose.model('Restaurant', restaurantSchema)