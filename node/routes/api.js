const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const dbHost = 'mongodb://database/mean-docker';

mongoose.connect(dbHost);

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  address: String,
  company: String
});

const User = mongoose.model('User', userSchema);

router.get('/', (req, res) => {
    res.send('api works');
});

router.get('/users', (req, res) => {
    User.find({}, (err, users) => {
        if (err) res.status(500).send(error)

        res.status(200).json(users);
    });
});

router.get('/users/:id', (req, res) => {
    User.findById(req.param.id, (err, users) => {
        if (err) res.status(500).send(error)

        res.status(200).json(users);
    });
});

router.post('/users', (req, res) => {
    let user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        address: req.body.address,
        company: req.body.company
    });

    user.save(error => {
        if (error) res.status(500).send(error);

        res.status(201).json({
            message: 'User created successfully'
        });
    });
});


module.exports = router;