const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const { resolve } = require('path/posix');


const profilePhotoSchema = new mongoose.Schema({
    data: String,
    contentType: String,
});



const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        minlength: 1,
        trim:true
    },
    walletAddress:{
        type: String,
        required: false,
        minlength: 1
    },
    userName: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    password:{
        type:String,
        required:true,
        minlength: 1
    },
    friends: [{
        friend: String
    }],
    isAdmin: {
        default: false,
        type: Boolean
    },
    pf:{
        type: String,

    }
})






//hash password
UserSchema.pre('save', function(next) {
	const user = this; // binds this to User document instance

	// checks to ensure we don't hash password more than once
	if (user.isModified('password')) {
		// generate salt and hash the password
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash
				next()
			})
		})
	} else {
		next()
	}
    user.pf = "https://avatars.dicebear.com/api/bottts/"+user.userName+".png"
})
UserSchema.statics.findByUserNamePassword = function(userName, password) {
	const User = this // binds this to the User model
    
	// First find the user by their userName
	return User.findOne({ userName: userName.toLowerCase() }).then((user) => {
        console.log(user)
		if (!user) {
			return Promise.reject()  // a rejected promise
		}
		// if the user exists, make sure their password is correct
		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (err, result) => {
				if (result) {
					resolve(user)
				} else {
					reject()
				}
			})
		})
	})
}

UserSchema.statics.validateUserName = function(userName){
    const User = this
    return User.findOne({userName:userName.toLowerCase()}).then((user) => {
        if(!user){
            return true
        }
        else{
            return false
        }
    })
}

// make a model using the User schema
const User = mongoose.model('User', UserSchema)
module.exports = { User }