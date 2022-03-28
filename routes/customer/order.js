const router = require('express').Router()
const Order = require('../../models/orders/Orders')
const orderController = require('../../controllers/order')

//GET ALL USER
router.get('/', orderController.getAllOrders)

//APPROVE SERVICE REQUEST
router.post('/approve/:orderId', orderController.approveServiceRequest)

//CANCEL SERVICE REQUEST
router.post('/cancel/:orderId', orderController.cancelServiceRequest)

module.exports = router
