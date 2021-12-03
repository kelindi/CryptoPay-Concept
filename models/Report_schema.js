const mongoose = require('mongoose')

import User from '../classes/User'

const ReportS = mongoose.model('ReportS', {
    submitter: {
        type: User,
        required: true
    },
    reportedUser: {
        type: User,
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

module.exports = { ReportS }