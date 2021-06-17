const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    }
});

const Subject = mongoose.model('subject', schema);

module.exports = Subject;