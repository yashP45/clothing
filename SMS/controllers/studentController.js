const Student = require("./../Models/studentModel")
const catchAsync = require('./../catchAsync')
const AppError = require('./../appError')

// Getting all Student list 
exports.getAllStudents = catchAsync(async (req, res) => {
    const students = await Student.find()

    res.status(200).json({
        status: 'Success',
        data: {
            students
        }
    })

})

// Adding a new Student 

exports.addNewStudent = catchAsync(async (req, res, next) => {
    const newStudent = await Student.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            Student: newStudent
        }
    })
})


// Update Student info
exports.updateStudent = catchAsync(async (req, res, next) => {
    const stud = await Student.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    if (!stud) {
        return next(new AppError('No user with this id'), 404)
    }
    res.status(200).json({
        status: 'success',
        data: {
            stud
        }
    })
})
// Add a new field
// exports.addField = catchAsync(async (req, res , next) => {
//     const student =await Student.findByIdAndUpdate
// })
// Delete student
exports.deleteStudent = catchAsync(async (req, res, next) => {
    const stud = await Student.findByIdAndDelete(req.params.id)
    if (!stud) {
        return next(new AppError('NO stud found with this id', 404))
    }
    res.status(204).json({
        status: 'success',
        data: null
    })
})

// Logging in student
exports.login = catchAsync(async (req, res, next) => {
    const { collegeId, password } = req.body;

    if (!collegeId || !password) {
        return next(new AppError('Please provide email & password', 400))
    }
    const student = await Student.findOne({ collegeId }).select('+password');

    if (!student || !(await student.correctPassword(password, student.password))) {
        return next(new AppError("Either email or password is incorrect", 401))
    }
    res.status(200).json({
        status: 'Success',
        student
    })
})