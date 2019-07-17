// services.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

ServiceSchema = new Schema({
    specialist_id: {
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
    preferred_hour: {
        type: String,
        required: true
    }
});

const Service = mongoose.model('services', ServiceSchema);

module.exports = Service