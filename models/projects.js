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
        type: String //request, accept, reject, finish
    },
    rating: {
        type: String    //1-5
    },
    review: {
        type: String
    }
});

// const Project = mongoose.model('projects', ProjectSchema);
// var Project;

if (mongoose.models.Project) {
    mongoose.models.Project = mongoose.model('projects');
} else {
    mongoose.models.Project = mongoose.model('projects', ProjectSchema);
}

module.exports = mongoose.models.Project;

