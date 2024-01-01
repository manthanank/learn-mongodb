const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

// Routes
router.get('/users', usersController.getUsers);
router.get('/users/:id', usersController.getUserById);
router.post('/users', usersController.createUser);
router.put('/users/:id', usersController.updateUserById);
router.delete('/users/:id', usersController.deleteUserById);

module.exports = router;
