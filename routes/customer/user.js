const express = require('express')

const router = express.Router()
const userController = require('../../controllers/user')

// router.get('/usertest', (req, res) => {
//   res.send('User test is successfull!')
// })

// router.post('/userposttest', (req, res) => {
//     const username = req.body.username;
//     res.send("name is : "+ username);
// })

//UPDATE USER
router.put('/:id', userController.updateUser)

//DELETE USER
router.delete('/:id', userController.deleteUser)

//GET USER
router.get('/find/:id', userController.getUser)

//GET ALL USER
router.get('/', userController.getAllUSers)

module.exports = router
