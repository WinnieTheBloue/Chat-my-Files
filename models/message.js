import mongoose from 'mongoose';

/**
 * Schema for a Message document in MongoDB using Mongoose.
 * Represents a message with content, author, and a timestamp.
 * 
 * - `content`: String, required. The text content of the message.
 * - `author`: String, required. A reference to the User who authored the message. 
 *             This is expected to align with the 'User' model in MongoDB.
 * - `createdAt`: Date. The date and time when the message was created.
 *                It defaults to the current date and time.
 */
const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Message', messageSchema);