const mongoose = require('mongoose')

const MoneyRequest = mongoose.model('MoneyRequest', {
    originUser: {
        type: String,
        required: true
    },
    destinationUser: {
        type: String,
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

module.exports = { MoneyRequest }