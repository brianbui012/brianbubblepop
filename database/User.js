const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    score: {
        type: Number,
    }
});

module.exports = User = mongoose.model('user', userSchema);