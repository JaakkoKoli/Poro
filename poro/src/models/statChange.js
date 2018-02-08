const mongoose = require('mongoose')

const url = 'mongodb://admin:3141592653589@ds119988.mlab.com:19988/porobase'

mongoose.connect(url)
mongoose.Promise = global.Promise;

const statChangeSchema = mongoose.model('StatChange', {
    stat: String,
    flat: Boolean,
    amount: Integer
})

statChangeSchema.statics.format = (statChange) => {
    return{
        stat: statChange.stat,
        flat: statChange.flat,
        amount: statChange.amount
    }
}

const StatChange = mongoose.model('StatChange', statChangeSchema)

module.exports = StatChange