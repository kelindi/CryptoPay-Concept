const mongoose = require('mongoose')

import User from '../classes/User'

const MoneyRequestS = mongoose.model('MoneyRequestS', {
    originUser: {
        type: User,
        required: true
    },
    destinationUser: {
        type: User,
        required: true
    },
    destinationWallet: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
})

module.exports = { MoneyRequestS }