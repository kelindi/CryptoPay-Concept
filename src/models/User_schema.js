const mongoose = require('mongoose')
import User from '../classes/User'

const UserS = mongoose.model('UserS', {
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
    username: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    friends: [{
        friend: User
    }]
})

module.exports = { UserS }