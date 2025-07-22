const router = require('express').Router()

const auth = require('../middleware/auth.middleware')

const {createCourse , getAllCourse , getCourseById , enrollCourse} = require('../controllers/course.controller')

router.post('/' , auth, createCourse)

router.get('/' , getAllCourse)

router.get('/:id' , getCourseById)

router.get('/:id/enroll' , auth , enrollCourse)

router.post('/:id/lessons', auth, require('../controllers/course.controller').addLessonToCourse);
router.post('/:id/quizzes', auth, require('../controllers/course.controller').addQuizToCourse);

module.exports = router;