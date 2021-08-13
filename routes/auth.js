const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const authController = require('../controllers/authController');

// Create user api/auth
router.post('/',
    [
        check('email', 'Add a valid email').isEmail(),
        check('password', 'Password must have a minimun of 6 characteres').isLength({ min: 6 })
    ],
    authController.authenticationUser
);

module.exports = router;

