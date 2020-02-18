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