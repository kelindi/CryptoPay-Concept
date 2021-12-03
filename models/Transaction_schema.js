const mongoose = require('mongoose')

import User from '../classes/User'

const TransactionS = mongoose.model('TransactionS', {
    originUser: {
        type: User,
        required: true
    },
    destinationUser: {
        type: User,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    }
})

module.exports = { TransactionS }