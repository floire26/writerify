const express = require('express');
const coursesController = require('../controllers/coursesController');
const router = express.Router();

router.get('/', coursesController.getCoursesList);
router.get('/enroll/:userId', coursesController.getCourseEnroll);


module.exports = router;
