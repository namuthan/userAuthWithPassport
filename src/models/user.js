const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({

    email: {
        type: String,
        unique: true,
        required: true
    },

    username: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true
    }

})

userSchema.plugin(uniqueValidator);

userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password)

}


module.exports = mongoose.model('User', userSchema)