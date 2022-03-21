const router = require('express').Router()
const serviceController = require('../../controllers/professional/service')

//add service
router.post('/addService', serviceController.addService)

//get all services
router.get('/services', serviceController.getAllServices)

//get service
router.get('/:serviceId', serviceController.getService)

//update service
router.put('/:serviceId', serviceController.updateService)

//delete service
router.delete('/:serviceId', serviceController.deleteService)

module.exports = router
