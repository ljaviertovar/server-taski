const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

exports.creatUser = async (req, res) => {

    // valid errors 
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const { email, password } = req.body;
    
    try {

        // validate if already existe the user 
        let user = await User.findOne({ email });

        if(user) {
            return res.status(400).json({msg: 'User already exist!'});
        }

        // creat new User 
        user = new User(req.body);

        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt);

        // save user 
        await user.save();

        res.json({msg: 'User created succesfully!'});
        
    } catch (error) {
        console.log(error);
        res.status(400).send('Oops!');
    }

}