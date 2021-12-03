const mongoose = require('mongoose')

const Transaction = mongoose.model('Transaction', {
    originUser: {
        type: String,
        required: true
    },
    destinationUser: {
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
    },
    time: {
        type: String,
        required: true
    }
})

module.exports = { Transaction }