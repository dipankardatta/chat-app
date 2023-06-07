const express = require('express')
const router = express.Router()
const groupController = require('../controllers/groupcontroller')
const userauthentication = require('../middleware/auth')

// POST A CHAT
router.post('/create', userauthentication.authenticate,groupController.createGroup)

// GET ALL MESSAGES
router.post('/:groupId/invite', userauthentication.authenticate,groupController.invite);

router.post('/:groupId/messages', userauthentication.authenticate,groupController.createChat);

router.get('/:groupId/messages', userauthentication.authenticate,groupController.getAllMessages);

router.get('/group', userauthentication.authenticate,groupController.getAllGroups)

module.exports = router

