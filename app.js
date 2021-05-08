const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const app = express()
const port = 3000
const db = mongoose.connection

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

// mongoose
mongoose.connect('mongodb://localhost/restaurantList', { useNewUrlParser: true, useUnifiedTopology: true })
db.on('error', () => console.log('MongoDB error'))
db.once('open', () => console.log('MongoDB connected'))

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => console.log(`Express is listening on localhost:${port}`))