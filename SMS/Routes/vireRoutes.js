const express = require('express')
const router = express.Router()
const viewsController = require('./../controllers/viewsController')
router.get('/home', viewsController.getDetails)
router.get('/', viewsController.login)


module.exports = router