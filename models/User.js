const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({

    name: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        trim: true,
    },
    register: {
        type: Date,
        default: Date.now()
    }

});

// export model User whit schema UserSchema 
module.exports = mongoose.model('User', UserSchema);