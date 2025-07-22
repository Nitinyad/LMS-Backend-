const Progress = require('../models/progress.model')

exports.markLessonComplete = async(req,res)=>{
    const {courseId , lessonId} = req.body;

    const progress = await Progress.findOne({userId : req.user.userId , courseId})

    if(!progress.completedLessons.includes(lessonId)){
        progress.completedLessons.push(lessonId)
    }

    await progress.save()
    res.json(progress)
}

exports.attemptQuiz = async(req,res)=>{
    const {quizId, answers, courseId} = req.body;
    const Quiz = require('../models/quiz.model');
    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({message: 'Quiz not found'});

    // Calculate score
    let score = 0;
    quiz.questions.forEach((q, idx) => {
        if (answers[idx] === q.correctIndex) score++;
    });

    const Progress = require('../models/progress.model');
    const progress = await Progress.findOne({userId: req.user.userId, courseId});
    const attemptNumber = (progress.quizAttempts.filter(a => a.quizId.toString() === quizId).length || 0) + 1;
    progress.quizAttempts.push({quizId, score, attemptNumber, answers});
    await progress.save();
    res.json({score, attemptNumber, total: quiz.questions.length});
}

exports.getProgress = async(req,res)=>{
    const Progress = require('../models/progress.model');
    const Course = require('../models/course.model');
    const progress = await Progress.findOne({userId : req.user.userId , courseId : req.params.courseId});
    if (!progress) return res.status(404).json({message: 'No progress found'});
    const course = await Course.findById(req.params.courseId).populate('lessons');
    const totalLessons = course.lessons.length;
    const completedLessons = progress.completedLessons.length;
    const percentComplete = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
    res.json({
        ...progress.toObject(),
        percentComplete
    });
}