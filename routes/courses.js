const express = require('express');
const coursesController = require('../controllers/coursesController');
const loggedInOnly = require('../middlewares/loggedInOnly')
const router = express.Router();

router.use(loggedInOnly)

router.get('/:UserId', coursesController.getCoursesList);
router.get('/:UserId/enroll/:CourseId/', coursesController.getCourseEnroll);
router.post('/:UserId/enroll/:CourseId/', coursesController.postCourseEnroll);
router.get('/:UserId/unenroll/:CourseId/', coursesController.getCourseUnenrolled);


module.exports = router;
