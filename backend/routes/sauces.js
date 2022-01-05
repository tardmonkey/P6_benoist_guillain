const express = require('express')

const router = express.Router()

const sCtrl = require('../controllers/sauceController')


router.post('/', sCtrl.createSauce)

router.post("/:id/like", sCtrl.likeDislike)

router.get("/", sCtrl.findSauces)

router.get('/:id', sCtrl.findOneSauce)

router.put("/:id", sCtrl.updateSauce)

router.delete("/:id", sCtrl.deleteSauce)


module.exports = router