const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    isAnswer: {
        type: Boolean,
        required: true,
        default: false
    }
});

const Options = mongoose.model('Options', schema);

module.exports = Options;