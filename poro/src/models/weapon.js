const mongoose = require('mongoose')

const url = 'mongodb://admin:3141592653589@ds119988.mlab.com:19988/porobase'

mongoose.connect(url)
mongoose.Promise = global.Promise;

const equipmentSchema = mongoose.model('Equipment', {
    name: String,
    description: String,
    type: String,
    effect: [{ type: mongoose.Schema.Types.ObjectId, ref: 'StatChange' }]
})

equipmentSchema.statics.format = (equipment) => {
    return{
        name: equipment.name,
        description: equipment.description,
        type: equipment.type,
        effect: equipment.effect
    }
}

const Equipment = mongoose.model('Equipment', equipmentSchema)

module.exports = Equipment