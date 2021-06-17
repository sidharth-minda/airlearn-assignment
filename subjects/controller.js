const Subject = require('../models/subject')

module.exports = {
    createSubject,
    getAllSubjects
}

async function createSubject(req, res) {
    let subject = req.body;
    console.log('Subject : ', subject)
    Subject.create(subject, (err, result) => {
        if(err) return res.status(500).json({ msg: "Database error!" })
        else return res.json(result)
    })
}

async function getAllSubjects(req, res) {
    let subjects = await Subject.find();
    res.json(subjects)
}