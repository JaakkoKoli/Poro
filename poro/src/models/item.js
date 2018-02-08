const mongoose = require('mongoose')

const url = 'mongodb://admin:3141592653589@ds119988.mlab.com:19988/porobase'

mongoose.connect(url)
mongoose.Promise = global.Promise;

const itemSchema = mongoose.model('Item', {
    name: String,
    description: String,
    type: String
})

itemSchema.statics.format = (item) => {
    return{
        name: item.name,
        description: item.description,
        type: item.type
    }
}

const Item = mongoose.model('Item', itemSchema)

module.exports = Item