const express = require('express')
const router = express.Router()
const userController = require('../../controllers/user')

//UPDATE A CUSTOMER
router.put('/customer/:email', userController.updateUser)

//UPDATE A PROFESSIONAL
router.put('/professional/:email', userController.updateProfessionalUser)

//DELETE A CUSTOMER
router.delete('/customer/:email', userController.deleteCustomerUser)

//DELETE A PROFESSIONAL
router.delete('/professional/:email', userController.deleteProfessionalUser)

//GET A CUSTOMER USER
router.get('/findcustomer/:email', userController.getCustomerUser)

//GET A PROFESSIONAL USER
router.get('/findprofessional/:email', userController.getProfessionalUser)

//GET ALL USER
router.get('/findAll', userController.getAllUSers)

module.exports = router
