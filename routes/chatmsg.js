const express = require('express')
const router = express.Router()
const chatcontroller = require('../controllers/chatcontroller')

// POST A CHAT
router.post('/chat', chatcontroller.createChat)

// GET ALL MESSAGES
router.get('/messages', chatcontroller.getAllMessages);


module.exports = router

