import Message from '../models/message.js';

const chatController = {
    async getMessages(req, res) {
        try {
            const messages = await Message.find();
            res.status(200).json(messages);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    async postMessage(req, res) {
        try {
            const message = new Message({
                content: req.body.content,
                author: req.body.author
            });
            await message.save();
            res.status(201).json(message);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    async deleteMessage(req, res) {
        try {
            const message = await Message.findByIdAndDelete(req.params.id);
            if(!message) {
                res.status(404).json({ message: 'Message not found' });
                return;
            }
            res.status(200).json(message);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

export default chatController;