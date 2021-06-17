const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.route('/')
      .post(controller.createQuestion)
      .get(controller.getAllQuestions)

router.route('/:_id')
      .get(controller.getQuestionById)

module.exports = router;