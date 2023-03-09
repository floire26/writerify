const express = require('express');
const promptController = require('../controllers/promptController');
const loggedInOnly = require('../middlewares/loggedInOnly');
const router = express.Router()


router.use(loggedInOnly)


router.get('/:userId', promptController.getTestForm);
router.post('/:userId', promptController.postTestForm);


module.exports = router;
