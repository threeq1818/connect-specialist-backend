// app.js

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const config = require('./db');
const services = require('./routes/services');
const users = require('./routes/users');
const projects = require('./routes/projects');
const authMiddleware = require('./middleware/auth');

mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => { console.log("Database is connected."); },
    err => { console.log("Cannot connect to the database." + err) }
);

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(authMiddleware);
app.use('/api/users', users);
app.use('/api/services', services);
app.use('/api/projects', projects);

app.get('/', function (req, res) {
    res.send('hello');
});

const PORT = process.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});