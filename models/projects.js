// projects.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    service_id: {
        type: String,
        require: true
    },
    customer_id: {
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
});

const Project = mongoose.model('projects', ProjectSchema);

model.exports = Project;

