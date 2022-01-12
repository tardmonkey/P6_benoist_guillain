const express = require('express')

const router = express.Router()

const sauceController = require('../controllers/sauceController')

const auth = require('../middleware/auth');

const multer = require('../middleware/multer-config');



router.post('/', auth, multer, sauceController.createSauce)

router.post("/:id/like",auth, sauceController.likeDislike)

router.get("/",auth, sauceController.findSauces)

router.get('/:id',auth, sauceController.findOneSauce)

router.put("/:id",auth, sauceController.updateSauce)

router.delete("/:id",auth, sauceController.deleteSauce)


module.exports = router