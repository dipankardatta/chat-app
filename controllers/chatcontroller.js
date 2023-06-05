const ChatMessage = require('../models/chatmsg')

exports.createChat = async (req, res) => {
    const { message } = req.body;
    console.log(message)

    try {
        const chatMessage = await ChatMessage.create({ message });
        res.status(201).json(chatMessage);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
}