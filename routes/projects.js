// routes / projects.js

const express = require('express');
const router = express.Router();
const Service = require('../models/services');
const Project = require('../models/projects');

// create request page for customer
// insert a project
router.post('/', function (req, res) {
    const { errors, isValid } = validateProjectInput(req.body);

    let newProject = new Project({

    });
})