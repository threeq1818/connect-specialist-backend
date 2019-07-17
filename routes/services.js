// routes/ services.js

const express = require('express');
const router = express.Router();
const Service = require('../models/services');
const validateServiceInput = require('../validation/serviceinput')
//  from specialist page
//  insert a new service
router.post('/', function (req, res) {
    const { error, isValid } = validateServiceInput(req.body);

    if (!isValid)
        return res.status(400).json(error);

    let newService = new Service({
        specialist_id: req.body.specialist_id,
        service_type: req.body.service_type,
        description: req.body.description,
        hourly_rate: req.body.hourly_rate,
        preferred_hour: req.body.preferred_hour
    });

    newService.save()
        .then(service => {
            res.json(service);
        })
        .catch(err => {
            res.status(400).json(err); //?????
        })
});

// from home page without authentication
// fetch all services
router.get('/fetchAll', function (req, res) {
    Service.find({})
        .then(services => {
            res.json(services);
        })
        .catch(err => {
            res.status(400).json(err);  //?????
        })
});

// without authentication home page
// fetch a service with _id
router.get('/:id', function (req, res) {
    const id = req.params.id;

    Service.findById(id)
        .then(service => {
            res.json(service);
        })
        .catch(err => {
            res.status(400).json(err);  //?????
        });
});

// specialist page
// fetch all services offered by the selected specialist
router.get('/specialist/:id', function (req, res) {
    const id = req.params.id;

    Service.find({ specialist_id: id })
        .then(services => {
            res.json(services);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

// edit service inner page fo specialist page
// update the service record with new data
router.put('/specialist/:id', function (req, res) {
    const id = req.params.id;

    let newService = new Service({
        specialist_id: req.body.specialist_id,
        service_type: req.body.service_type,
        description: req.body.description,
        hourly_rate: req.body.hourly_rate,
        preferred_hour: req.body.preferred_hour
    });

    Service.update(id, newService)
        .then(service => {
            res.json(service);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

// edit service inner page of specialist page
// deleted service record
router.delete('/:id', function (req, res) {
    const id = req.params.id;

    Service.deleteById(id)
        .then(service => {
            res.json(service);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

module.exports = router;
