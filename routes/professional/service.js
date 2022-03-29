/*  Author: Prit Ajaykumar Sorathiya - B00890175 */

const router = require('express').Router()
const serviceController = require('../../controllers/professional/service')
const orderController = require('../../controllers/order')

//service stats
router.get(
  '/stats/:professionalId',
  orderController.fetchOrders,
  serviceController.fetchAllMyServices,
  serviceController.getServiceStats
)

//add service
router.post('/addService', serviceController.addService)

//get all services
router.get('/services', serviceController.getAllServices)

//get all my services
router.get('/services/:professionalId', serviceController.getAllMyServices)

//get service
router.get('/:serviceId', serviceController.getService)

//update service
router.put('/:serviceId', serviceController.updateService)

//delete service
router.delete('/:serviceId', serviceController.deleteService)

module.exports = router
