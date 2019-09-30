const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true
    },
    firstname: String,
    lastname: String
})

// UserSchema model's methods
UserSchema.methods.encryptPassword = (password) => {
    return bcrypt.hash(password, 10)
}

UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password)
}

// UserSchema validators
UserSchema.plugin(uniqueValidator)

module.exports = model('User', UserSchema)