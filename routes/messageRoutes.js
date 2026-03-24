const express = require('express');
const router = express.Router();
const { getMessages, sendMessage, getChatContacts } = require('../controllers/messageController');

// Define routes for sending and getting messages
router.post('/', sendMessage);
router.get('/contacts/:userId', getChatContacts);
router.get('/:userId', getMessages);

module.exports = router;
