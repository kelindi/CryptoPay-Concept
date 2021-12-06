const mongoose = require('mongoose')
const { friendRequest } = require('./FriendRequestModel')

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
    },
    status:{
        type:Boolean,
        required: false,
        default: false
    },
    comment:{
        type:String,
        required: false
    }

})

module.exports = { Report }