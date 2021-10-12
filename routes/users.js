const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { check } = require('express-validator'); 

// Create user api/users
router.post('/', 
[
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Add a valid email').isEmail(),
    check('password', 'Password must have a minimun of 6 characteres').isLength({ min: 6})
],
userController.creatUser);

module.exports = router;

