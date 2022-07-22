const express = require('express');
const studentController = require('./../controllers/studentController')
const router = express.Router();

router.route('/').get(studentController.getAllStudents)
router.route('/login').post(studentController.login)
router.route('/newStudent').post(studentController.addNewStudent)
router.route('/:id').patch(studentController.updateStudent)


module.exports = router; 