const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Create user api/users
router.post('/', userController.creatUser);

module.exports = router;