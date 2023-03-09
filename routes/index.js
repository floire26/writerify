const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')


router.get('/', Controller.home)
router.get('/login', Controller.login)
router.post('/login', Controller.loginPost)
router.get('/register', Controller.register)
router.post('/register', Controller.registerPost)
router.get('/course-list', Controller.courseList)


module.exports = router

