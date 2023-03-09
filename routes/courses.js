const express = require('express');
const coursesController = require('../controllers/coursesController');
const router = express.Router();

router.get('/:UserId', coursesController.getCoursesList);
router.get('/:UserId/enroll/:CourseId/', coursesController.getCourseEnroll);
router.post('/:UserId/enroll/:CourseId/', coursesController.postCourseEnroll);
router.get('/:UserId/unenroll/:CourseId/', coursesController.getCourseUnenrolled);


module.exports = router;
