const Questions = require('../models/questions');
const Options = require('../models/options');
const Subject = require('../models/subject');

module.exports = {
    createQuestion,
    getAllQuestions,
    getQuestionById
}

async function createQuestion(req, res) {
    let options = req.body.options;
    let text = req.body.text
    let marks = req.body.marks
    let subject = req.body.subject
    Options.insertMany(options,(err, result)=>{
        if(err){
            res.status(500).json({ message : "Unable to create new question!" })
        }
        else{
            var data = Questions({
                text: text,
                marks: marks, 
                options: result,
                subject : subject,
            })
            data.save().then(()=>{
                res.json({ message : `New question created successfully!` })
            }).catch((err) => {
                res.status(500).json({ message : "Unable to create new question!"})
            })
        }
    })
}


async function getAllQuestions(req, res) {
    let questions;
    try {
        questions = await Questions.find()
                                    .populate('options')
                                    .populate({
                                        path: 'subject',
                                        model: Subject,
                                        select: {
                                            '_id': 0,
                                            'text': 1
                                        }
                                    })
    }
    catch(err) {
        return res.status(500).json('Request Failed :: ' +  err);
    }
    
    res.json(questions);
}

async function getQuestionById(req, res) {

    let id = req.params._id
    let question = await Questions.findById(id);
    if(!question)
        return res.status(404).json({ message: 'No data found' })

    res.json(question);
}