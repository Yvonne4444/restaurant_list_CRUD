const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// home
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

// search
router.get('/search', (req, res) => {
  const keyword = req.query.keyword // <input name="keyword">
  const trimmedkeyword = keyword.trim()

  return Restaurant.find({
    $or: [
      { name: { $regex: trimmedkeyword, $options: 'i' } },
      { category: { $regex: trimmedkeyword, $options: 'i' } }
      // i: case insensitive 無關大小寫
    ]
  })
    .lean()
    .then(restaurants => res.render('index', { restaurants, keyword }))
    .catch(error => console.log(error))
})

// sort
router.get('/sort', (req, res) => {
  const { select } = req.query
  
  Restaurant.find()
    .lean()
    .sort(select)
    .then(restaurants => res.render('index', { restaurants, select }))
    .catch(error => console.log(error))
})

module.exports = router