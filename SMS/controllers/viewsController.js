const Student = require('./../Models/studentModel')
const catchAsync = require('../catchAsync')


exports.getDetails = catchAsync(async (req, res, next) => {

    const students = await Student.find();
    res.status(200).render('home', {
        title: 'Details',
        students
    })
})

exports.login = (req, res) => {
    res.status(200).render('login', {
        name: 'yash',
        email: 'yash@gmail.com'
    })
}

