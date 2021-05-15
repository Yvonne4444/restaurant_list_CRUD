const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// Create 頁面
router.get('/create', (req, res) => {
  return res.render('create')
})
// Create 資料處理
router.post('/create', (req, res) => {
  const restaurant = req.body
  // 必要資訊為空格
  if (restaurant.name.trim().length === 0 ||
    restaurant.location.trim().length === 0 ||
    restaurant.phone.trim().length === 0) {
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
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

// Update 頁面
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})
// Update 資料處理
router.put('/:id', (req, res) => {
  const reNew = req.body
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = reNew.name.trim() || restaurant.name
      restaurant.category = reNew.category
      restaurant.image = reNew.image.trim() || 'https://ubin.io/EtdNey'
      restaurant.location = reNew.location.trim() || restaurant.location
      restaurant.phone = reNew.phone.trim() || restaurant.phone
      restaurant.google_map = reNew.google_map
      restaurant.rating = reNew.rating
      restaurant.description = reNew.description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

// Delete
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router