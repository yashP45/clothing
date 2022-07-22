const app = require('./app.js');
const mongoose = require("mongoose");
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })
const DB = process.env.DATABASE;
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(con => console.log("DB connection successful"));

const port = 3001;
const server = app.listen(port, () => {
    console.log("App running .......... ")
})
