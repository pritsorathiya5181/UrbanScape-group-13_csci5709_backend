//Author: Rikin Pineshkumar Patel

const router = require('express').Router();
const supportController = require('../../controllers/professional/support')


router.post('/', supportController.addSupport)

module.exports = router;
