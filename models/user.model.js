const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username : String , 
    email : String ,
    password : String ,
    role : {type : String , enum : ['admin' , 'user'] , default : 'user'},
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
})

module.exports = mongoose.model('User' , userSchema);
