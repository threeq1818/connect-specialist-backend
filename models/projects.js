// projects.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    from_specialist: {
        type: String,
        require: true
    },
    to_customer: {
        type: String,
        require: true
    },
    request_date: {
        type: Date
    },
    accept_date: {
        type: Date
    },
    reject_date: {
        type: Date
    },
    status: {
        type: Number //0: request, 1: accept, 2: reject, 3: finish
    },
    rating: {
        type: Number    //1-5
    },
    review: {
        type: String
    }
})