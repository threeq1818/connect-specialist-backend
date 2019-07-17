// validation/ serviceinput.js

const Validator = require('validator');
const isEmpty = require('./is-empty');


// specialist_id, service_type, description, hourly_rate, preferred_hour /////// date
module.exports = function validateServiceInput(data) {
    let errors = {};
    data.specialist_id = !isEmpty(data.specialist_id) ? data.specialist_id : '';
    data.service_type = !isEmpty(data.service_type) ? data.service_type : '';
    data.description = !isEmpty(data.description) ? data.description : '';
    data.hourly_rate = !isEmpty(data.hourly_rate) ? data.hourly_rate : '';
    data.preferred_hour = !isEmpty(data.preferred_hour) ? data.preferred_hour : '';

    if (Validator.isEmpty(data.specialist_id)) {
        errors.name = 'Specialist field is required.';
    }

    if (Validator.isEmpty(data.service_type)) {
        errors.name = 'Service -Type is required.';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }

}