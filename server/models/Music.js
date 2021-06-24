const mongoose = require('mongoose');

const musicSchema = mongoose.Schema({

    artist: {
        type: String,
        maxlength: 50
    },

    title: {
        type: String,
        maxlength:50
    },

    link: {
        type: String,
        maxlength:200
    },

    path: {
        type: String,
        maxlength:100
    }
})


const Music = mongoose.model('Music', musicSchema);

module.exports = { Music }