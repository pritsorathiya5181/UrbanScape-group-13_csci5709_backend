const router = require('express').Router()
const subscriptionController = require('../../controllers/newslettersubscription')

//add email subscription
router.post('/', subscriptionController.addSubscription)

module.exports = router
