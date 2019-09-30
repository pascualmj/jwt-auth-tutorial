const User = require('../models/User.model')
const { passwordIsValid, generateToken } = require('../utils/global')

const register = async (req, res, next) => {
    const { email, username, password } = req.body
    try {
        if (!passwordIsValid(password)) {
            return res.status(409).json({
                error: {
                    message: 'Invalid password.'
                }
            })
        }
        const user = new User({
            email,
            username,
            password
        })
        user.password = await user.encryptPassword(user.password)
        await user.save()
        res.status(201).json({
            message: 'Resource created succesfully.'
        })
    } catch (error) {
        res.status(500).json({
            error: {
                message: error.message
            }
        })
    }
}

const login = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const docs = await User.find({ email })
        if (docs.length < 1) {
            return res.status(404).json({
                error: {
                    message: 'Auth failed.'
                }
            })
        }
        const passwordIsCorrect = await docs[0].comparePassword(password)
        if (!passwordIsCorrect) {
            return res.status(401).json({
                error: {
                    message: 'Auth failed.'
                }
            })
        }
        const token = generateToken({
            email: docs[0].email,
            id: docs[0]._id
        }, process.env.JWT_SECRET_KEY, { expiresIn: 60 * 60 * 24 * 7 })
        res.status(200).json({
            message: 'User logged in successfully.',
            data: {
                token
            }
        })
    } catch (error) {
        res.status(500).json({
            error: {
                message: error.message
            }
        })
    }
}

const me = async (req, res, next) => {
    const { id } = req.userData
    try {
        const doc = await User.findById(id).select('email username -_id')
        if (!doc) {
            return res.status(404).json({
                error: {
                    message: 'Resource not found.'
                }
            })
        }
        res.status(200).json({
            message: `Welcome ${doc.username}!`,
            data: doc
        })
    } catch (error) {
        res.status(500).json({
            error: {
                message: error.message
            }
        })
    }
}

module.exports = {
    register,
    login,
    me
}