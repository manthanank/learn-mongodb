const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    age: { type: Number },
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    dateOfBirth: { type: Date },
    address: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        zipCode: { type: String }
    },
    phoneNumber: { type: String },
    isActive: { type: Boolean, default: true },
    registrationDate: { type: Date, default: Date.now }
});

const Users = mongoose.model('users', userSchema);

module.exports = Users;
