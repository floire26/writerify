const express = require('express');
const promptController = require('../controllers/promptController');
const router = express.Router()

router.get('/:userId', promptController.getTestForm);
router.post('/:userId', promptController.postTestForm);


module.exports = router;
