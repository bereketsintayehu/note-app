const mongoose = require('mongoose')

const noteSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    text: {
        type: String,
        required: [true, 'Please add a text value']
    },
    md: {
        type: String,
        required: [false]
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Note', noteSchema)