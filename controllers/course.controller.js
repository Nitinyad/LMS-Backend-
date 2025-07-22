const Course = require('../models/course.model')
const Lesson = require('../models/lesson.model')

exports.createCourse = async(req,res)=>{
    if(req.user.role!= 'admin'){
        return res.status(403).json({message : 'only admin'})
    }
    const { title, description, instructor, price } = req.body;
    const course = await Course.create({ ...req.body, createdBy: req.user.userId });
    res.status(201).json(course)
}

exports.getAllCourse = async(req,res)=>{
    const { page = 1, limit = 10 } = req.query;
    const courses = await Course.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
    const count = await Course.countDocuments();
    res.json({
        courses,
        totalPages: Math.ceil(count / limit),
        currentPage: page
    });
}

exports.getCourseById = async(req,res)=>{
    const course = await Course.findById(req.params.id).populate('lessons quizzess')
    res.json(course)
}


exports.enrollCourse = async (req,res)=>{
    const User = require('../models/user.model');
    const Progress = require('../models/progress.model');

    // Add course to user's enrolledCourses
    await User.findByIdAndUpdate(req.user.userId, {
        $addToSet: { enrolledCourses: req.params.id }
    });
    
    // Create progress tracker
    await Progress.create({userId : req.user.userId , courseId : req.params.id , completedLessons : [] , quizAttempts : []})
    res.json({message : 'Enrolled'})
}

exports.addLessonToCourse = async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'only admin' });
    }
    const { title, videoUrl, resources } = req.body;
    const Lesson = require('../models/lesson.model');
    const lesson = await Lesson.create({ title, videoUrl, resources });
    await Course.findByIdAndUpdate(req.params.id, { $push: { lessons: lesson._id } });
    res.status(201).json(lesson);
};

exports.addQuizToCourse = async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'only admin' });
    }
    const { questions } = req.body;
    const Quiz = require('../models/quiz.model');
    const quiz = await Quiz.create({ questions });
    await Course.findByIdAndUpdate(req.params.id, { $push: { quizzes: quiz._id } });
    res.status(201).json(quiz);
};

