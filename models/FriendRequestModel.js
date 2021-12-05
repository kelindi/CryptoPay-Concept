const mongoose = require('mongoose');

const friendRequest = mongoose.model('friendRequest', {
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

module.exports = {friendRequest}