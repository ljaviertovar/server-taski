const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { expretionResult, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.authenticationUser = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {

        // validate user exist
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'User does not exist' });
        }

        // validate password
        const correctPass = await bcryptjs.compare(password, user.password);
        if (!correctPass) {
            return res.status(400).json({ msg: 'Password incorrect!' });
        }

        // add token 
        const payload = {
            user: {
                id: user.id
            }
        }


        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600
        }, (error, token) => {
            res.json({ token })
        });

    } catch (error) {
        console.error(error);
    }

}