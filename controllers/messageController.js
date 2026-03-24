const Message = require('../models/Message');

// @desc    Get messages between two users
// @route   GET /api/messages/:userId
// @access  Private-ish (Simplified for demo)
const getMessages = async (req, res) => {
  try {
    const { userId } = req.params;
    const { otherUserId } = req.query;

    const ADMIN_ID = '000000000000000000000000';
    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: otherUserId },
        { sender: otherUserId, receiver: userId },
        // Also show admin warnings sent to either user in this conversation context
        { sender: ADMIN_ID, receiver: userId },
        { sender: ADMIN_ID, receiver: otherUserId }
      ]
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Send a message
// @route   POST /api/messages
// @access  Public (Simplified for demo)
const sendMessage = async (req, res) => {
  console.log('Sending message:', req.body);
  try {
    const { sender, receiver, content } = req.body;

    if (!sender || !receiver || !content) {
      return res.status(400).json({ message: 'Please provide sender, receiver, and content' });
    }

    const message = await Message.create({
      sender,
      receiver,
      content
    });

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all unique contacts for a user
// @route   GET /api/messages/contacts/:userId
// @access  Private-ish
const getChatContacts = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find all messages where user is sender or receiver
    const messages = await Message.find({
      $or: [{ sender: userId }, { receiver: userId }]
    }).populate('sender receiver', 'name avatar role');

    const contactsMap = new Map();

    messages.forEach(msg => {
      let otherUser = null;
      
      const sId = msg.sender ? msg.sender._id.toString() : '000000000000000000000000';
      const rId = msg.receiver ? msg.receiver._id.toString() : '000000000000000000000000';

      if (sId === userId) {
        otherUser = msg.receiver;
      } else {
        otherUser = msg.sender;
      }
      
      const otherUserIdStr = otherUser ? otherUser._id.toString() : '000000000000000000000000';
      
      // If otherUser is Admin (null after populate), create a dummy admin object
      if (!otherUser && otherUserIdStr === '000000000000000000000000') {
        otherUser = { _id: '000000000000000000000000', name: 'Admin', role: 'admin' };
      }

      if (otherUser && !contactsMap.has(otherUserIdStr)) {
        contactsMap.set(otherUserIdStr, {
          _id: otherUser._id,
          name: otherUser.name,
          avatar: otherUser.avatar,
          role: otherUser.role,
          lastMessage: msg.content,
          lastTime: msg.createdAt
        });
      } else if (otherUser) {
          const existing = contactsMap.get(otherUserIdStr);
          if (new Date(msg.createdAt) > new Date(existing.lastTime)) {
              existing.lastMessage = msg.content;
              existing.lastTime = msg.createdAt;
          }
      }
    });

    res.json(Array.from(contactsMap.values()));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getMessages, sendMessage, getChatContacts };
