const router = require('express').Router()
const cartController = require('../../controllers/cart')

router.get('/:user', cartController.getAllCartItems)
router.post('/:user', cartController.addToCart)
router.delete('/:user/:itemId', cartController.deleteCartItem)

module.exports = router