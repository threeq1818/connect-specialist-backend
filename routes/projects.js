// routes / projects.js

const express = require('express');
const router = express.Router();
const Service = require('../models/services');
const User = require('../models/users');
const Project = require('../models/projects');
const validateProjectInput = require('../validation/projectinput');
const isEmpty = require('../validation/is-empty');

// create request page for customer
// insert a project
router.post('/', function (req, res) {
    const { errors, isValid } = validateProjectInput(req.body);

    if (!isValid)
        res.status(400).json(errors);

    let newProject = new Project({
        service_id: req.body.service_id,
        customer_id: req.body.customer_id,
        request_date: Date.now(),
        accept_reject_date: '',
        finish_date: '',
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
    const user = await User.findById(speialist_id);
    const services = await Service.find({ specialist_id: speialist_id });

    const sidArray = services.map(a => a._id);

    let newProjectProtoType = [];
    Project.find({ service_id: { $in: sidArray }, status: "finish" })
        .then(projects => {
            projects.forEach(element => {
                let newObj = element.toObject();
                newObj.specialist_email = user.email;
                let service = services.find(x => x._id == element.service_id);
                newObj.service_type = service.service_type;
                newObj.description = service.description;
                newObj.hourly_rate = service.hourly_rate;
                newObj.preferred_hour = service.preferred_hour;
                newProjectProtoType.push(newObj);
            });
            res.json(newProjectProtoType);
        })
        .catch(err => {
            res.status(400).json(err);
        })
});

// specialist page
// fetch the requested projects by a specialist with id
router.get('/specialist/requestedProjs/:id', async function (req, res) {
    const speialist_id = req.params.id;
    const user = await User.findById(speialist_id);
    // console.log(user);
    const services = await Service.find({ specialist_id: speialist_id });
    // console.log(services);

    const sidArray = services.map(a => a._id);
    // console.log(sidArray);
    let newProjectProtoType = [];
    Project.find({ service_id: { $in: sidArray }, status: "request" })
        .then(projects => {
            projects.forEach((element, i) => {
                let newObj = element.toObject();
                newObj.specialist_email = user.email;
                let service = services.find(x => x._id == element.service_id);
                newObj.service_type = service.service_type;
                newObj.description = service.description;
                newObj.hourly_rate = service.hourly_rate;
                newObj.preferred_hour = service.preferred_hour;
                newProjectProtoType.push(newObj);
            });
            res.json(newProjectProtoType);
        })
        .catch(err => {
            res.status(400).json(err);
        })
});

// customer page
// fetch the finnished projects of the selected customer by id
router.get('/customer/finishedProjs/:id', async function (req, res) {
    const customer_id = req.params.id;
    const user = await User.findById(customer_id);
    // console.log(user);
    const services = await Service.find();
    // console.log(services);

    const sidArray = services.map(a => a._id);
    // console.log(sidArray);

    let newProtoTypeProjectArray = [];
    Project.find({ customer_id: customer_id, status: "finish" })
        .then(projects => {
            projects.forEach(async (element) => {
                let newObj = element.toObject();
                newObj.specialist_email = user.email;
                let service = services.find(x => x._id == element.service_id);
                newObj.service_type = service.service_type;
                newObj.description = service.description;
                newObj.hourly_rate = service.hourly_rate;
                newObj.preferred_hour = service.preferred_hour;
                newProtoTypeProjectArray.push(newObj);
            });
            res.json(newProtoTypeProjectArray);
        })
        .catch(err => {
            res.status(400).json(err);
        })
});

// customer page
// fetch the project by  project_id
router.get('/:id', async function (req, res) {
    const project_id = req.params.id;

    Project.findById(project_id)
        .then(async (project) => {
            const service = await Service.findById(project.service_id);
            const user = await User.findById(service.specialist_id);
            let newObj = project.toObject();
            newObj.specialist_email = user.email;
            newObj.service_type = service.service_type;
            newObj.description = service.description;
            newObj.hourly_rate = service.hourly_rate;
            newObj.preferred_hour = service.preferred_hour;
            res.json(newObj);
        })
        .catch(err => {
            res.status(400).json(err);
        })
});

// specialist page
// specialist accepts the proejct
router.put('/specialist/acceptProject/:id', function (req, res) {
    const project_id = req.params.id;
    // const { errors, isValid } = validateProjectInput(req.body);

    // if (!isValid)
    //     res.status(400).json(errors);

    Project.updateOne({ _id: project_id }, { $set: { status: 'accept', accept_reject_date: Date.now() } })
        .then(project => {
            res.json(project);
            // {
            //     "n": 1,
            //     "nModified": 1,
            //     "ok": 1
            // }
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

// specialist page
// specialist reject the proejct
router.put('/specialist/rejectProject/:id', function (req, res) {
    const project_id = req.params.id;
    // const { errors, isValid } = validateProjectInput(req.body);

    // if (!isValid)
    //     res.status(400).json(errors);

    Project.updateOne({ _id: project_id }, { $set: { status: 'reject', accept_reject_date: Date.now() } })
        .then(project => {
            res.json(project);
            // {
            //     "n": 1,
            //     "nModified": 1,
            //     "ok": 1
            // }
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

// customer page
// customer finish the project with rating and review
router.put('/customer/finishProject/:id', function (req, res) {
    // const { errors, isValid } = validateProjectInput(req.body);

    // if (!isValid)
    //     res.status(400).json(errors);

    const project_id = req.params.id;
    // let newProject = new Project({
    //     service_id: req.body.service_id,
    //     customer_id: req.body.customer_id,
    //     request_date: Date.now(),
    //     accept_reject_date: '',
    //     finish_date: '',
    //     status: 'request',
    //     rating: '',
    //     review: ''
    // });


    const rating = !isEmpty(req.body.rating) ? req.body.rating : '';
    const review = !isEmpty(req.body.review) ? req.body.review : '';

    Project.updateOne({ _id: project_id }, { $set: { status: 'finish', finish_date: Date.now(), rating: rating, review: review } })
        .then(project => {
            res.json(project);
            // {
            //     "n": 1,
            //     "nModified": 1,
            //     "ok": 1
            // }
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

module.exports = router;