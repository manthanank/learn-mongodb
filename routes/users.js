const express = require('express');
const Users = require('../models/users.js');
const router = express.Router();

const controller = require('../controllers/users');
router.get('/', controller.getUsers);
// get users request
router.get('/users',(req,res,next) => {
    Users.find({}).then((data) =>{
        res.send(data);
    }).catch(next);
});
router.get('/users', (req, res) => {
    Users.find((err, doc) => {
        if (err) {
            console.log('Error While Getting' + err);
        }
        else {
            res.send(doc);
        }
    })
});

// get users by id request
router.get('/users/:id', (req, res, next) => {
    Users.findOne({ _id: req.params.id }).then((data) => {
        res.send(data);
    });
});

// post users request
router.post('/users',(req,res,next) => {
    Users.create(req.body).then((data) =>{
        res.send(data);
    }).catch(next);
});

// update users by id request
router.put('/users/:id', (req, res, next) => {
    Users.findOneAndUpdate({ _id: req.params.id }, req.body).then((data) => {
        Users.findOne({ _id: req.params.id }).then((data) => {
            res.send(data);
        });
    });
});

// delete users by id request
router.delete('/users/:id', (req, res, next) => {
    Users.findOneAndDelete({ _id: req.params.id }).then((data) => {
        res.send(data);
    });
});

module.exports = router;