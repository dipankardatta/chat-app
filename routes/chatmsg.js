const express = require('express')
const router = express.Router()
const chatcontroller = require('../controllers/chatcontroller')
const usercontroller = require('../controllers/usercontroller')
const userauthentication = require('../middleware/auth')

// POST A CHAT
router.post('/chat', userauthentication.authenticate,chatcontroller.createChat)

// GET ALL MESSAGES
router.get('/messages', userauthentication.authenticate,chatcontroller.getAllMessages);

router.get('/userlist', userauthentication.authenticate,usercontroller.getAllUsers);



module.exports = router

