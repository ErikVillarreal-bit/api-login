const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 10
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 512
    },
    pass: {
        type: String,
        required: true,
        min: 6,
        max: 12
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User',userSchema)