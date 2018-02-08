const mongoose = require('mongoose')

const url = 'mongodb://admin:3141592653589@ds119988.mlab.com:19988/porobase'

mongoose.connect(url)
mongoose.Promise = global.Promise;

const typeSchema = mongoose.model('Type', {
    name: String,
    baseHealth: Integer,
    baseAttack: Integer,
    baseDefense: Integer,
    healthGain: Integer,
    attackGain: Integer,
    defenseGain: Integer
})

typeSchema.statics.format = (type) => {
    return{
        name: type.name,
        baseHealth: type.baseHealth,
        baseAttack: type.baseAttack,
        baseDefense: type.baseDefense,
        healthGain: type.healthGain,
        attackGain: type.attackGain,
        defenseGain: type.defenseGain
    }
}

const Type = mongoose.model('Type', typeSchema)

module.exports = Type