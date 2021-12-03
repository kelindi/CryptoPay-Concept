const mongoose = require('mongoose')

const Report = mongoose.model('Report', {
    submitter: {
        type: String,
        required: true
    },
    reportedUser: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true,
    },
    date:{
        type: Date,
        required: true
    },
    time:{
        type: String,
        required: true
    }

})

module.exports = { Report }