// models/user.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    account_type: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// const User = mongoose.model('users', UserSchema);
//var User;

if (mongoose.models.User) {
    mongoose.models.User = mongoose.model('users');
} else {
    mongoose.models.User = mongoose.model('users', UserSchema);
}

module.exports = mongoose.models.User;