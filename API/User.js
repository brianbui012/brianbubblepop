const express = require('express');
const mongoose = require('mongoose');
const User = require('../database/User');
const route = express.Router();

route.post('/', async (req, res) => {
    const { username, score } = req.body;
    let user = {};
    user.username = username;
    user.score = score;

    let userModel = new User(user);
    await userModel.save();
    res.json(userModel);
});

module.exports = route;