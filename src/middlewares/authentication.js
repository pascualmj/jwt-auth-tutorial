const { decodeToken } = require('../utils/global')

module.exports = (req, res, next) => {
    try {
        // Get the token from request headers "Bearer <Token>"
        const token = req.headers.authorization.split(' ')[1]
        req.userData = decodeToken(token, process.env.JWT_SECRET_KEY)
        next()
    } catch (error) {
        res.status(401).json({
            error: {
                message: 'Auth failed.'
            }
        })
    }
}