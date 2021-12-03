const mongoose = require('mongoose')

const User = mongoose.model('User', {
    firstName: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        minlength: 1,
        trim:true
    },
    walletAddress:{
        type: String,
        required: true,
        minlength: 1
    },
    userName: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    friends: [{
        friend: String
    }]
})

module.exports = { User }