// routes/ services.js

const express = require('express');
const router = express.Router();
const Service = require('../models/services');

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
        });
});