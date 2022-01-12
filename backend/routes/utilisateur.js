const express = require('express')

const router = express.Router()

const utilisateurCtrl = require('../controllers/authController')

const limit = require("../middleware/express-rate-limit-config");

router.post("/signup", utilisateurCtrl.signup)

router.post("/login", limit, utilisateurCtrl.login)

module.exports = router 