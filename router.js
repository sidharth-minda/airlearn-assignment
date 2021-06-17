const express = require('express');
const router = express.Router();

router.use('/questions', require('./questions/router'));
router.use('/exam', require('./exams/router'));
router.use('/subject', require('./subjects/router'));

module.exports = router;