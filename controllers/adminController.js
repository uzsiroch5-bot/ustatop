const User = require('../models/User');
const Message = require('../models/Message');

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password').sort({ createdAt: -1 });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Toggle block status of a user
// @route   PUT /api/admin/users/:id/block
// @access  Private/Admin
const toggleUserBlock = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            user.isBlocked = !user.isBlocked;
            await user.save();
            res.json({ message: `User ${user.isBlocked ? 'blocked' : 'unblocked'} successfully`, user });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            await user.deleteOne();
            res.json({ message: 'User removed' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all messages (for chat monitoring)
// @route   GET /api/admin/chats
// @access  Private/Admin
const getAllMessages = async (req, res) => {
    try {
        const messages = await Message.find({})
            .populate('sender', 'name phone')
            .populate('receiver', 'name phone')
            .sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a message
// @route   DELETE /api/admin/chats/:id
// @access  Private/Admin
const deleteMessage = async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        if (message) {
            await message.deleteOne();
            res.json({ message: 'Message removed' });
        } else {
            res.status(404).json({ message: 'Message not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Admin sends a message to a user
// @route   POST /api/admin/chats/send
// @access  Private/Admin
const sendAdminMessage = async (req, res) => {
    try {
        const { receiverId, content } = req.body;
        
        if (!receiverId || !content) {
            return res.status(400).json({ message: 'Receiver and content are required' });
        }

        const message = await Message.create({
            sender: '000000000000000000000000', // Admin ID
            receiver: receiverId,
            content: content,
            isAdminMessage: true
        });

        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllUsers,
    toggleUserBlock,
    deleteUser,
    getAllMessages,
    deleteMessage,
    sendAdminMessage
};
