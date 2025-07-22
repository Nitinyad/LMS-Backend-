const mongoose = require('mongoose')

const progressSchema = new mongoose.Schema({
    userId : mongoose.Schema.Types.ObjectId,
    courseId : mongoose.Schema.Types.ObjectId,
    completedLessons : [mongoose.Schema.Types.ObjectId],
    quizAttempts : [{
        quizId : mongoose.Schema.Types.ObjectId,
        score : Number,
        attemptNumber: Number,
        answers: [Number]
    }]
})

module.exports = mongoose.model('Progress' , progressSchema);