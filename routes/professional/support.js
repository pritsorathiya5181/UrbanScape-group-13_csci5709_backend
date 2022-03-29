//Author: Rikin Pineshkumar Patel

const router = require('express').Router();
const supportController = require('../../controllers/professional/support')

//post to ContactUs Page
router.post('/', supportController.addSupport)

module.exports = router;
