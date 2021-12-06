const mongoose = require('mongoose');

const FriendRequest = mongoose.model('friendRequest', {
    originUser: {
        type: String,
        required: true
    },
    destinationUser: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

module.exports = {FriendRequest}