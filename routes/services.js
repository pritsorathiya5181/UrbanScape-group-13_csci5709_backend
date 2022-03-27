const router = require('express').Router()
const servicesController = require('../controllers/services')

//get all services
router.get('/serviceCategories', servicesController.getAllServices)

module.exports = router
