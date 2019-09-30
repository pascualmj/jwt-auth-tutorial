const jwt = require('jsonwebtoken')

module.exports = class Utils {

    static sum(a, b) {
        return a + b
    }

    static passwordIsValid(password) {
        return /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)
    }

    static generateToken(data, key, options) {
        return jwt.sign(data, key, options)
    }

    static decodeToken(token, key) {
        return jwt.verify(token, key)
    }

}