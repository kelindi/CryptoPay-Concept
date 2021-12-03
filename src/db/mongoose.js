const mongoose = require('mongoose')

const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://CryptoPay:Team42@cluster0.brbjl.mongodb.net/test'

mongoose.connect(mongoURI,
    {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .catch((error) => {
        console.log('Error connecting to mongodb. Timeout reached.')
    });

    module.exports = { mongoose }