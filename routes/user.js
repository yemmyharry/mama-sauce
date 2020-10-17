const express = require('express')
const router = express.Router()
const { user_signup, user_login, delete_user } = require('../controllers/user')
const checkAuth = require('../middleware/check-auth')

router.post('/signup', user_signup)

router.post('/login', user_login)

router.delete('/:userId', checkAuth, delete_user)


module.exports = router;