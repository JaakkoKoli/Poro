const mongoose = require('mongoose')

const Type = mongoose.model('Type', {
    name: String,
    picture: String,
    rarity: String,
    baseHealth: Number,
    baseAttack: Number,
    baseDefense: Number,
    healthGain: Number,
    attackGain: Number,
    defenseGain: Number
})

module.exports = Type