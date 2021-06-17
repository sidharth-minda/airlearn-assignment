const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    text: {
        type : String,
        required: true
    },
    marks: {
        type : Number,
        required : false,
        default : 4
    },
    options: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Options',
        required : true
    }],
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required : true
    }
});

const Questions = mongoose.model('Questions', schema);

module.exports = Questions;