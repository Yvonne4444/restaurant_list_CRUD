const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000
const db = mongoose.connection

// mongoose
mongoose.connect('mongodb://localhost/restaurantList', { useNewUrlParser: true, useUnifiedTopology: true })
db.on('error', () => console.log('MongoDB error'))
db.once('open', () => console.log('MongoDB connected'))

app.get('/', (req, res) => {
  res.send('hi')
})

app.listen(port, () => console.log(`Express is listening on localhost:${port}`))