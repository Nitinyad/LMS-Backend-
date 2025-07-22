const mongoose = require('mongoose')

const lessonSchema = new mongoose.Schema({
    title :String , 
    videoUrl : String , 
    resources : [String]
})

module.exports = mongoose.model('Lesson' , lessonSchema)