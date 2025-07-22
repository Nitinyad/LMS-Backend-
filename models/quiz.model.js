const mongoose = require('mongoose')


const quizSchema = new mongoose.Schema({
    questions : [{
        text : String, 
        options : [String],
        correctIndex : Number
    }]
})

module.exports = mongoose.model('Quiz' , quizSchema);