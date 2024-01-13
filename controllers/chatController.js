import Message from '../models/message.js';

/**
 * `chatController` contains methods for handling chat message operations:
 * retrieving messages, posting new messages, and deleting messages.
 */
const chatController = {
    /**
     * Asynchronously retrieves all messages from the database.
     * 
     * @param {Object} req - The HTTP request object.
     * @param {Object} res - The HTTP response object.
     * @returns {Promise<Array>} A promise that resolves to an array of message objects.
     */
    async getMessages(req, res) {
        try {
            const messages = await Message.find();
            return messages;
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    /**
     * Asynchronously posts a new message to the chat. The message content is taken from the request body,
     * and the author is identified by the user's email stored in the session.
     * After saving the message, it redirects to the chat page.
     * 
     * @param {Object} req - The HTTP request object, containing the message content in the body and the user's email in the session.
     * @param {Object} res - The HTTP response object.
     */
    async postMessage(req, res) {
        try {
            const message = new Message({
                content: req.body.content,
                author: req.session.user.email,
            });
            await message.save();
            return res.redirect('/chat');
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    /**
     * Asynchronously deletes a message based on the message ID provided in the request parameters.
     * If the message is found and deleted, it redirects to the chat page. If not found, it sends a 404 error response.
     * 
     * @param {Object} req - The HTTP request object, containing the message ID in the URL parameters.
     * @param {Object} res - The HTTP response object.
     */
    async deleteMessage(req, res) {
        try {
            const message = await Message.findByIdAndDelete(req.params.id);
            if (!message) {
                res.status(404).json({ message: 'Message not found' });
                return;
            }
            return res.redirect('/chat');
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

export default chatController;
