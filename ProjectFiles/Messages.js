const express = require('express');
const router = express.Router();
const messagesController = require('../controllers/messagesController');

router.post('/', messagesController.sendMessage);
router.get('/:userName', messagesController.getMessages);

module.exports = router;