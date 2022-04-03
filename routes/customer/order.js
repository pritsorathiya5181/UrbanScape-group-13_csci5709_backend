const router = require('express').Router()
const orderController = require('../../controllers/order')

//GET ALL USER
router.get('/', orderController.getAllOrders)

//APPROVE SERVICE REQUEST
router.post('/approve/:orderId', orderController.approveServiceRequest)

//CANCEL SERVICE REQUEST
router.post('/cancel/:orderId', orderController.cancelServiceRequest)

//SUBMIT ORDER AFTER PAYMENT
router.post('/payment/:user', orderController.submitOrder)

module.exports = router
