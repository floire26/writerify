const express = require('express')
const router = express.Router()
const promptRouter = require('./prompt');
const coursesRouter = require('./courses');

const Controller = require('../controllers/controller')


router.get('/', Controller.home)
router.get('/login', Controller.login)
router.post('/login', Controller.loginPost)
router.get('/register', Controller.register)
router.post('/register', Controller.registerPost)
router.get('/logout', Controller.logout)
// router.get('/course-list', Controller.courseList)


// router.get('/', 'main');
router.use('/prompt',  promptRouter);
router.use('/courses', coursesRouter);


module.exports = router
