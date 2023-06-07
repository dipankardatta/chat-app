const ChatMessage = require('../models/chatmsg')

exports.createChat = async (req, res) => {
    const { name, message,selectedUser } = req.body;
    console.log(name)
    console.log(message)

    try {
        const chatMessage = await ChatMessage.create({ name, message ,selectedUser,userId: req.user.id });
        res.status(201).json(chatMessage);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.getAllMessages = async (req, res) => {
    try {
      const senderId = req.user.id; // Get the logged-in user's ID
      const recipientId = req.query.selectedUser
  
      const messages = await ChatMessage.findAll({
        where: { userId:senderId,selectedUser:recipientId }, // Fetch messages only for the logged-in user
      });
  
      res.status(200).json(messages);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  