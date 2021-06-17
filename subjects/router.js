const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.route('/')
        .post(controller.createSubject)
        .get(controller.getAllSubjects)

module.exports = router;