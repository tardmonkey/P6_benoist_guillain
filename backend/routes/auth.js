const express = require('express')

const router = express.Router()

const aCtrl = require('../controllers/authController')


router.post('/signup', aCtrl.signup)

router.post("/login", aCtrl.login)

module.exports = router