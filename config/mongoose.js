const mongoose = require('mongoose')
const db = mongoose.connection

mongoose.connect('mongodb://localhost/restaurantList', { useNewUrlParser: true, useUnifiedTopology: true })
db.on('error', () => console.log('MongoDB error'))
db.once('open', () => console.log('MongoDB connected'))

module.exports = db