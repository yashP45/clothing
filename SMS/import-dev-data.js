const mongoose = require("mongoose");
const fs = require("fs")
const dotenv = require('dotenv')
const Student = require('./Models/studentModel')
dotenv.config({ path: './config.env' })

const DB = process.env.DATABASE;
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true

}).then(con => console.log("DB connection successful"))

//Read json file 

const students = JSON.parse(fs.readFileSync(`${__dirname}/data.json`, 'utf-8'))

// IMPORT DATA FROM DB

const importData = async () => {
    try {
        await Student.create(students);
        console.log('data successfully stored')
        process.exit();
    } catch (err) {
        console.log(err)
    }
}
// Delete DATA FROM DB

const deleteData = async () => {
    try {
        await Student.deleteMany();
        console.log('data successfully deleted')
        process.exit();
    } catch (err) {
        console.log(err)
    }
}

if (process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete') {
    deleteData();
}
