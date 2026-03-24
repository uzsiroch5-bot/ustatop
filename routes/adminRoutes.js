const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    toggleUserBlock,
    deleteUser,
    getAllMessages,
    deleteMessage,
    sendAdminMessage
} = require('../controllers/adminController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

// All admin routes are protected by JWT and Admin check
router.use(protect);
router.use(isAdmin);

// User management
router.get('/users', getAllUsers);
router.put('/users/:id/block', toggleUserBlock);
router.delete('/users/:id', deleteUser);

// Chat monitoring
router.get('/chats', getAllMessages);
router.delete('/chats/:id', deleteMessage);
router.post('/chats/send', sendAdminMessage);

module.exports = router;
