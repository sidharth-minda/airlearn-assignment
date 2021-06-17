const mongoose = require('mongoose');
const Subject = require('./subject');

let schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: false,
        default: 'MCQ'
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
    },
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Questions',
        required: true
    }],
    duration: {
        type: Number,
        required: false,
        default: 180
    },
    numberOfQuestions: {
        type: Number,
        required: false
    }
});

const Exam = mongoose.model('Exam', schema);

module.exports = Exam;