const express = require('express');
const coursesController = require('../controllers/coursesController');
const router = express.Router();

router.get('/:userId', coursesController.getCoursesList);
router.get('/:userId/enroll/:courseId/', coursesController.getCourseEnroll);


module.exports = router;
