const mongoose = require('mongoose')

const url = 'mongodb://admin:3141592653589@ds119988.mlab.com:19988/porobase'

mongoose.connect(url)
mongoose.Promise = global.Promise;

const poroSchema = mongoose.model('Poro', {
    name: String,
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'Type' },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: Date,
    experience: Integer,
    level: Integer,
    healthIV: Integer,
    attackIV: Integer,
    defenseIV: Integer
})

poroSchema.statics.format = (poro) => {
    return{
        id: poro._id,
        name: poro.name,
        type: poro.type,
        owner: poro.owner,
        date: poro.date,
        experience: poro.experience,
        level: poro.level,
        healthIV: poro.healthIV,
        attackIV: poro.attackIV,
        defenseIV: poro.defenseIV
    }
}

const Poro = mongoose.model('Poro', poroSchema)

module.exports = Poro