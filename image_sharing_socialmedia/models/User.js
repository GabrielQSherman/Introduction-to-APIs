const mongoose = require('mongoose'),

      bcrypt = require('bcryptjs'),

      jwt = require('jsonwebtoken'),

      validator = require('validator');



const UserSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({error: 'Invalid Email address'})
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 7
    },
    tokens:{
            type: [Object],
            required: true
        }
   
});

 //.pre is a method to run a function before the first parameter takes place,
// in this case, before the model instance is saved to the DB

UserSchema.pre('save', async function (next) {

    const user = this //the current instance of UserSchema being saved

    if (user.isModified('password')) {

        user.password = await bcrypt.hash(user.password, 8);

    }

    next()

});

UserSchema.methods.generateAuthToken = async function (currentUser) {

    const user = this; 
          
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY);

    user.tokens = user.tokens.concat({token});

    await user.save()

    return token
    
}

//logging in function
UserSchema.statics.findByCredentials = async (email, password) => {

    const foundUser = await userExport.findOne({email: email}).exec()
    if (!foundUser) {

        throw new Error('User Name Not Found')
        
    }

    await bcrypt.compare(password, foundUser.password)
    .then( matched => {

        if (!matched) {

            throw new Error('Invalid Password')
            
        }
    })

    return foundUser //when the user information is found then they can be logged in
}

//setting the model export to a variable to it can be used inside of the find by credential funciton. which is going to authenticate users when they try to log in
const userExport = mongoose.model('User', UserSchema);


module.exports = userExport;