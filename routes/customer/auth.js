const router = require('express').Router()
const User = require('../../models/user/User')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')
const authcontroller = require('../../controllers/auth');



router.post("/usersignup",authcontroller.signupUser); 
router.post("/professionalsignup",authcontroller.professionalsignup);
router.get("/users/:email/:password",authcontroller.userlogin);
router.get("/professionals/:email/:password",authcontroller.professionallogin);
router.get("/forgetpassword/:email",authcontroller.forgetpassword);
router.post("/deleteuser",authcontroller.deleteuser);
router.get("/verifyotp/:otp",authcontroller.verifyotp);
router.get("/updatepassword/:username/:password",authcontroller.updatepassword);
module.exports = router
