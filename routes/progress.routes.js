const express = require('express')

const router = express.Router()

const auth = require('../middleware/auth.middleware')
const {
    markLessonComplete ,
    attemptQuiz,
    getProgress
} = require('../controllers/progress.controller')


router.post('/lesson' , auth , markLessonComplete)


router.post('/quiz' , auth , attemptQuiz)

router.get('/:courseId' , auth , getProgress)


module.exports = router