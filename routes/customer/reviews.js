const router = require('express').Router()
const reviewcontroller = require('../../controllers/review')

router.post('/addReview', reviewcontroller.addReview)
router.get('/displayReview',reviewcontroller.displayReview)

module.exports = router
