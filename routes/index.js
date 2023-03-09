const express = require('express')
const router = express.Router()
const Controller = require('../contollers/controller')


router.get('/', Controller.home)
router.get('/login', Controller.login)
router.post('/login', Controller.loginPost)
router.get('/register', Controller.register)
router.post('/register', Controller.registerPost)


module.exports = router

