const express = require('express')
const router = express.Router()
const publicRouter = require('./public')
const promptRouter = require('./prompt');
const coursesRouter = require('./courses');

const Controller = require('../controllers/controller')


router.use('/', publicRouter)

router.use('/prompt',  promptRouter);
router.use('/courses', coursesRouter);

router.get('/logout', Controller.logout)


module.exports = router
