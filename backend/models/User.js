const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    score: {
        type: Number,
    },
    timestamp: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;