const mongoose = require('mongoose');

const Users = mongoose.model('users', {
    firstName: { type: String },
    lastName: { type: String }
});

module.exports = Users;