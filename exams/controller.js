const Exam = require('../models/exam');
const Questions = require('../models/questions');
const Options = require('../models/options');
const Subject = require('../models/subject');

module.exports = {
    createExam,
    getAllExams,
    getExamById,
    submitExam,
}

async function createExam(req, res) {
    var type =  req.body.type;
    var name =  req.body.name;
    var questions =  req.body.questions;
    var duration = req.body.duration;
    var subject = req.body.subject;

    var data = Exam({
        type: type,
        name: name,
        questions: questions,
        duration: duration,
        subject: subject,
        numberOfQuestions: questions.length
    });

    data.save().then((result)=>{
        res.json({
            message : `Exam created successfully!`,
            testid : result._id
        })
    }).catch((err)=>{
        res.status(500).json({ message : "Unable to create Exam. Please try again Later." })
    })
}

async function getAllExams(req, res) {
    let exams;
    try {
        exams = await Exam.find()
                        .select(['_id', 'name', 'subject', 'type', 'duration', 'numberOfQuestions'])
                        .populate({
                            path: 'subject',
                            model: Subject
                        })
    }
    catch(err) {
        return res.status(500).json('Unable to find exams!! \nError :: ' + err)
    }

    if(!exams.length)
        return res.status(404).json({ message: 'No data found!' });

    res.json(exams)
}

async function getExamById(req, res) {
    let examId = req.params._id
    let exam = await Exam.findById(examId)
                        .select(['duration', 'questions'])
                        .populate('questions', 'text')
                        .populate({
                            path: 'questions',
                            model: Questions,
                            select: {
                                'text': 1
                            },
                            populate: {
                                path: 'options',
                                model: Options,
                                select: {
                                    '_id': 1,
                                    'text': 1
                                }
                            }
                        })
    res.json(exam)
}

async function submitExam(req, res) {
    let examId = req.body.examId
    let answers = req.body.answers;
    let count = 0;
    let questionCount = await Exam.findById(examId, { numberOfQuestions: 1 })
    let numberOfQuestions = questionCount.numberOfQuestions
    return new Promise((resolve, reject) => {
        answers.forEach((value, index, array) => {
            Options.findById(value).select('isAnswer').exec((err, res) => {
                if(res.isAnswer === true) ++count;
                if(index == array.length - 1) resolve();
            })
        })
    }).then(() => {
        let wrongAnswers = answers.length - count;
        let marksObtained = (count * 4) - wrongAnswers;
        let totalMarks = numberOfQuestions * 4;
        res.json({ 
            'Marks Obtained': marksObtained,
            'Maximum Possible Marks': totalMarks,
            'Correct Answers': count,
            'Wrong Answers': wrongAnswers,
            'Questions Attempted': answers.length,
            'Questions Not Attempted': numberOfQuestions - answers.length,
            'Total Questions': numberOfQuestions
        })
    })
}