const express = require('express');
const studentRouter = require("./Routes/studentRoute")
const path = require('path');
const { resolveSoa } = require('dns');
const app = express();
const viewRouter = require('./Routes/vireRoutes')
app.use(express.json());

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))


// Routes


app.use('/api/v1/students', studentRouter);
app.use('/', viewRouter);


module.exports = app;