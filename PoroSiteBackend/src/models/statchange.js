const mongoose = require('mongoose')

const StatChange = mongoose.model('StatChange', {
    stat: String,
    flat: Boolean,
    amount: Number
})

module.exports = StatChange