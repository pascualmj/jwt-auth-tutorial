const { Router } = require('express')
const router = Router()
const usersController = require('../controllers/users.controller')
const checkAuth = require('../middlewares/authentication')

router.post('/register', usersController.register)
router.post('/login', usersController.login)
router.get('/me', checkAuth, usersController.me)

module.exports = router