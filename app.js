const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant')
const methodOverride = require('method-override')
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
// listen
app.listen(port, () => console.log(`Express is listening on localhost:${port}`))

// mongoose
mongoose.connect('mongodb://localhost/restaurantList', { useNewUrlParser: true, useUnifiedTopology: true })
db.on('error', () => console.log('MongoDB error'))
db.once('open', () => console.log('MongoDB connected'))

// index (瀏覽頁)
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

// Create 頁面
app.get('/create', (req, res) => {
  return res.render('create')
})
// Create 資料處理
app.post('/create/new', (req, res) => {
  const restaurant = req.body
  // 名稱為空格
  if (restaurant.name.trim().length === 0) {
    return res.redirect('/')
  }
  // 未提供圖片
  if (restaurant.image.length === 0) {
    restaurant.image = 'https://ubin.io/EtdNey'
  }
  return Restaurant.create(restaurant)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// show
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

// Update 頁面
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})
// Update 資料處理
app.put('/restaurants/:id', (req, res) => {
  const reNew = req.body
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = reNew.name.trim() || restaurant.name
      restaurant.category = reNew.category
      restaurant.image = reNew.image || 'https://ubin.io/EtdNey'
      restaurant.location = reNew.location.trim() || restaurant.location
      restaurant.phone = reNew.phone
      restaurant.google_map = reNew.google_map
      restaurant.rating = reNew.rating
      restaurant.description = reNew.description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

// Delete
app.delete('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})