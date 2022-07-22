const mongoose = require('mongoose')
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name'],
        maxlength: [40, 'A name must have max or equals to 40 characters'],
        minlength: [4, 'A name must have more or equals to 10 characters']
    },
    phone: {
        type: Number,
        required: true,
        maxlength: [10, 'Invalid phone no.'],
        minlength: [10, 'Invalid phone no.']
    },
    email: {
        type: String,
        required: [true, 'Please tell us your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please use a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter password'],
        minlength: [8, 'A password must have more or equals to 10 characters'],
        select: false
    },
    confirmPassword: {
        type: String,
        required: [true, 'Please confirm entered password'],
        validate: {
            validator: function (el) {
                return el === this.password
            },
            message: 'Password is not same'
        }
    },
})

const Register = new mongoose.model("Register", userSchema);
module.exports = Register