// validation/ register.js

const Validator = require('validator');
const isEmpty = require('./is-empty');

// email, account_type, password, password_confirm ///////avatar, date
module.exports = function validateRegisterInput(data) {
    let errors = {};
    data.email = !isEmpty(data.email) ? data.email : '';
    data.account_type = !isEmpty(data.account_type) ? data.account_type : '';
    data.password = !isEmpty(data.password) ? data.password : '';


    if (!Validator.isEmpty(data.email)) {
        errors.name = 'Email field is required.';
    }

    if (!Validator.isEmail(data.email)) {
        errors.name = 'Email is invalid.';
    }

    if (!Validator.isEmpty(data.account_type)) {
        errors.name = 'Account-Type is required.';
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Password must have 6 chars';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }

    if (!Validator.isLength(data.password_confirm, { min: 6, max: 30 })) {
        errors.password_confirm = 'Password must have 6 chars';
    }

    if (!Validator.equals(data.password, data.password_confirm)) {
        errors.password_confirm = 'Password and Confirm Password must match';
    }

    if (Validator.isEmpty(data.password_confirm)) {
        errors.password_confirm = 'Password is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }

}