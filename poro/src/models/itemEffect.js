const mongoose = require('mongoose')

const url = 'mongodb://admin:3141592653589@ds119988.mlab.com:19988/porobase'

mongoose.connect(url)
mongoose.Promise = global.Promise;

const itemEffectSchema = mongoose.model('ItemEffect', {
    type: String,
    usable: Boolean,
    value: Integer,
    amount: Integer
})

itemEffectSchema.statics.format = (itemEffect) => {
    return{
        type: itemEffect.type,
        usable: itemEffect.usable,
        value: itemEffect.value,
        amount: itemEffect.amount
    }
}

const ItemEffect = mongoose.model('ItemEffect', itemEffectSchema)

module.exports = ItemEffect