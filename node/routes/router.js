const express = require('express')
const router = express.Router()
const {emailValid, passwordValid, isSecretValid} = require('../middleware/middle')
const {register, login, postuser, createpost, mainpage, sendmessage, allmessages} = require('../controllers/main-controller')

router.post('/register', emailValid, passwordValid, register)
router.post('/sendmessage', sendmessage)
router.get('/allmessages', allmessages)

module.exports = router