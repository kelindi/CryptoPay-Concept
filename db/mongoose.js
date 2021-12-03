const mongoose = require('mongoose')

const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://CryptoPay:Team42@cluster0.brbjl.mongodb.net/CryptoPay'

mongoose.connect(mongoURI,
    {useNewUrlParser: true, useUnifiedTopology: true})
    .catch((error) => {
        console.log(error)
        console.log('Error connecting to mongodb. Timeout reached.')
    });

    module.exports = { mongoose }



    
    