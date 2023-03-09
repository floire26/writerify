const express = require('express')
const router = express.Router()
const bodyparser = require('body-parser');
const promptRouter = require('./prompt');
const coursesRouter = require('./courses');

// router.get('/', 'main');
router.use('/prompt',  promptRouter);
router.use('/courses', coursesRouter);


module.exports = router
