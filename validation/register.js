// validation/ register.js

const Validator = require('validator');
const isEmpty = require('./is-empty');

// email, account_type, password, confirm_password ///////avatar, date
module.exports = function validateRegisterInput(data) {
    let errors = {};
    data.email = !isEmpty(data.email) ? data.email : '';
    data.account_type = !isEmpty(data.account_type) ? data.account_type : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.confirm_password = !isEmpty(data.confirm_password) ? data.confirm_password : '';

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required.';
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid.';
    }

    if (Validator.isEmpty(data.account_type)) {
        errors.account_type = 'Account-Type is required.';
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Password must have 6 chars';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }

    if (Validator.isEmpty(data.confirm_password)) {
        errors.confirm_password = 'Confirm Password is required';
    }

    if (!Validator.isLength(data.confirm_password, { min: 6, max: 30 })) {
        errors.confirm_password = 'Password must have 6 chars';
    }

    if (!Validator.equals(data.password, data.confirm_password)) {
        errors.confirm_password = 'Password and Confirm Password must match';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }

}