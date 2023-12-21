const express = require('express')
const router = express.Router()
const authControllers = require('../../controllers/authController')
const authMiddleware = require('../../middleware/auth')


router.post('auth/register', authControllers.register)

router.post('auth/login', authControllers.login)

router.post('auth/logout', authControllers.logout)

router.post('auth/refresh', authControllers.refresh)

router.get('auth/user', authMiddleware, authControllers.user)

module.exports = router