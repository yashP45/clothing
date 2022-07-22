const mongoose = require('mongoose');
const validator = require("validator")
const bcrypt = require('bcryptjs');
const catchAsync = require('../catchAsync');
const studentSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Name cannot be blank']
    },
    collegeId: {
        type: String,
        required: true,
        unique: true
    },
    dateOfBirth: {
        type: Date
    },
    bloodGroup: String,
    email: {
        type: String,
        required: [true, 'Please tell us your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please use a valid email']
    },
    phoneNo: {
        type: Number,
        maxLength: [10, 'invalid Phone number'],
        minLength: [10, 'invalid Phone number']
    },
    gender: String,
    address: {
        type: String,
        required: [true, 'please enter your address ']
    },
    password: {
        type: String,
        required: [true, 'please provide a password'],
        minLength: 8
    },
    image: String,
    country: String,
    addhar: Number,
    caste: String,
    dateOfAddmission: Date,
    secondaryRoll: Number,
    seniorSecondaryRoll: Number,
    secondaryPercent: Number,
    seniorSecondaryPercent: Number,
    secondaryBoard: String,
    seniorSecondaryBoard: String
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})
// This will encrypt password before sving into dataBase

studentSchema.pre('save', async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 12);

    next();
})
// function to check if password is correct or not 

studentSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword)
}

const Student = mongoose.model('Student', studentSchema)
module.exports = Student;