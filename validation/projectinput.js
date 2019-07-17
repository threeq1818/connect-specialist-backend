// validation/ serviceinput.js

const Validator = require('validator');
const isEmpty = require('./is-empty');


// service_id, customer_id, request_date, accept_date, reject_date, status, rating, review 
module.exports = function validateServiceInput(data) {
    let errors = {};
    data.service_id = !isEmpty(data.service_id) ? data.service_id : '';
    data.customer_id = !isEmpty(data.customer_id) ? data.customer_id : '';
    data.request_date = !isEmpty(data.request_date) ? data.request_date : '';
    data.accept_date = !isEmpty(data.accept_date) ? data.accept_date : '';
    data.reject_date = !isEmpty(data.reject_date) ? data.reject_date : '';
    data.status = !isEmpty(data.status) ? data.status : '';
    data.rating = !isEmpty(data.rating) ? data.rating : '';
    data.review = !isEmpty(data.review) ? data.review : '';

    if (Validator.isEmpty(data.service_id)) {
        errors.name = 'Service field is required.';
    }

    if (Validator.isEmpty(data.customer_id)) {
        errors.name = 'Customer is required.';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }

}