const express = require('express')
const router = express.Router()

const {login, register} = require('../controllers/login/index')
const {admin} = require('../controllers/admin/index')

const {verifyToken} = require('../middlewares/validateToken')

router.post('/login', login)
router.post('/register', register)

//PROTECTED ROUTES
router.get('/admin', verifyToken, admin)

module.exports = router