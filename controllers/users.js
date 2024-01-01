const Users = require('../models/users.js');

// Get all users
exports.getUsers = (req, res, next) => {
    Users.find({})
        .then((data) => {
            res.send(data);
        })
        .catch(next);
};

// Get user by ID
exports.getUserById = (req, res, next) => {
    Users.findOne({ _id: req.params.id })
        .then((data) => {
            res.send(data);
        })
        .catch(next);
};

// Create a new user
exports.createUser = (req, res, next) => {
    Users.create(req.body)
        .then((data) => {
            res.send(data);
        })
        .catch(next);
};

// Update user by ID
exports.updateUserById = (req, res, next) => {
    Users.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .then((data) => {
            res.send(data);
        })
        .catch(next);
};

// Delete user by ID
exports.deleteUserById = (req, res, next) => {
    Users.findOneAndDelete({ _id: req.params.id })
        .then((data) => {
            res.send(data);
        })
        .catch(next);
};
