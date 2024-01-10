const express = require('express')
const router = express.Router()
router.get('/', (req, res) => {
  res.render('Homepage.ejs', { Name: 'Mamad' })
})
module.exports = router
