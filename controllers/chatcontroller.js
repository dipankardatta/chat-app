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

exports.getAllMessages = async (req,res) =>{
    try{
        const messages = await ChatMessage.findAll();
        res.status(200).json(messages)
    } catch (err){
        res.status(500).json({error: 'Internal Server Error'})
    }
}