// services.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

ServiceSchema = new Schema({
    specialist_email: {
        type: String,
        required: true
    },
    service_type: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    hourly_rate: {
        type: Number,
        required: true
    },
    prefered_hour: {
        type: String,
        required: true
    }
});

const Service = mongoose.model('services', ServiceSchema);

model.exports = Service