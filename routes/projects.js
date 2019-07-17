// routes / projects.js

const express = require('express');
const router = express.Router();
const Service = require('../models/services');
const User = require('../models/users');
const Project = require('../models/projects');
const validateProjectInput = require('../validation/projectinput');

// create request page for customer
// insert a project
router.post('/', function (req, res) {
    const { errors, isValid } = validateProjectInput(req.body);

    let newProject = new Project({
        service_id: req.body.service_id,
        customer_id: req.body.customer_id,
        request_date: Date.now(),
        accept_date: '',
        reject_date: '',
        status: 'request',
        rating: '',
        review: ''
    });

    newProject.save()
        .then(project => {
            res.json(project);
        })
        .catch(err => {
            res.status(400).json(err);
        })
});

// specialist page
// fetch the finished projects by a specialist with id
router.get('/specialist/finishedProjs/:id', async function (req, res) {
    const speialist_id = req.params.id;
    // const user = await User.findById(speialist_id);
    // const services = await Service.find({ specialist_id: speialist_id });

    const sidArray = services.map(a => a.service_id);
    Project.find({ service_id: { in: sidArray } })
        .then(projects => {
            projects.forEach(element => {
                element.specialist_email = user.email;
                let service = services.find(x => x._id == element.service_id);
                element.service_type = service.service_type;
                element.description = service.description;
                element.hourly_rate = service.hourly_rate;
                element.preferred_hour = service.preferred_hour;
            });
            res.json(projects);
        })
});

module.exports = router;