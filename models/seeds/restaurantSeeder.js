const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const restaurantList = require('./restaurants.json').results
const db = mongoose.connection

mongoose.connect('mongodb://localhost/restaurantList', { useNewUrlParser: true, useUnifiedTopology: true })

db.on('error', () => console.log('MongoDB error'))
db.once('open', () => {
  console.log('MongoDB connected')
  Restaurant.create(restaurantList)
  console.log('done')
})