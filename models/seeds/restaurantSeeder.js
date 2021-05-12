const db = require('../../config/mongoose')
const Restaurant = require('../restaurant')
const restaurantList = require('./restaurants.json').results

db.once('open', () => {
  Restaurant.create(restaurantList)
  console.log('done')
})