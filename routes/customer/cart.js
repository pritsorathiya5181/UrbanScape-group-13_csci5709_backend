//Author : Aeshna Verma (B00880776)

const router = require('express').Router()
const cartController = require('../../controllers/cart')

router.get('/:user', cartController.getAllCartItems)
router.post('/:user', cartController.addToCart)
router.delete('/:user', cartController.deleteCartItem)
router.put('/:user', cartController.createCart)

module.exports = router