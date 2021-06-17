const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.route('/')
        .post(controller.createExam)
        .get(controller.getAllExams)

router.route('/:_id')
        .get(controller.getExamById)

router.route('/submit')
        .post(controller.submitExam)

module.exports = router;