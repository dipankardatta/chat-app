const express = require('express');
const router = express.Router();
const usercontroller = require('../controllers/usercontroller')

// GET ALL USERS
router.get('/', usercontroller.getAllUsers)

//POST A NEW USER
router.post('/signup',usercontroller.signupUser)

//POST a signin user
router.post('/signin', usercontroller.signInUser)

module.exports = router