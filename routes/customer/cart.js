const router = require('express').Router()
const cartController = require('../../controllers/cart')

router.get('/', cartController.getAllCartItems)
router.post('/add', cartController.addToCart)

module.exports = router