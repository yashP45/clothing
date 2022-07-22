const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
app.use(express.urlencoded({ extended: false }))
const Register = require('./Models/registers')
const static_path = path.join(__dirname, '../public')
const template_path = path.join(__dirname, './templates/views')
const partials_path = path.join(__dirname, './templates/partials')
app.use(express.static(static_path))

app.set("view engine", 'hbs');
app.set("views", template_path)
hbs.registerPartials(partials_path)

app.get('/', (req, res) => {
    res.render('index');
})
app.get('/register', (req, res) => {

    res.render('register');
})
app.post('/register', async (req, res) => {
    try {

        if (req.body.password === req.body.confirmPassword) {
            const saveInfo = new Register({
                name: req.body.fullName,
                password: req.body.password,
                phone: req.body.phone,
                email: req.body.email,
                confirmPassword: req.body.confirmPassword,

            })

            const registered = await saveInfo.save();
            res.status(200).redirect('register')
        } else {
            res.send('Passwords are not matching')
        }
    } catch (err) {
        res.status(400).send(err)
    }
})
module.exports = app;