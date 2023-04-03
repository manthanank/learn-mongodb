const Users = require('../models/users.js');

//get all users
exports.getUsers = (req, res, next) => {
    Users.find({}).then((data) => {
        res.send(data);
    }).catch(next);
}