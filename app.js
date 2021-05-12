const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const routes = require('./routes')
const app = express()
const port = 3000
const db = mongoose.connection

// handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
// static files
app.use(express.static('public'))
// body-parser
app.use(express.urlencoded({ extended: true }))
// RESTful
app.use(methodOverride('_method'))
// routes
app.use(routes)
// listen
app.listen(port, () => console.log(`Express is listening on localhost:${port}`))

// mongoose
mongoose.connect('mongodb://localhost/restaurantList', { useNewUrlParser: true, useUnifiedTopology: true })
db.on('error', () => console.log('MongoDB error'))
db.once('open', () => console.log('MongoDB connected'))