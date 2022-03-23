const router = require('express').Router()
const Order = require('../../models/orders/Orders')
const orderController = require('../../controllers/order')


//GET ALL USER
router.get('/', orderController.getAllOrders)

module.exports = router