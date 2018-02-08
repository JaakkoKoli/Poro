const mongoose = require('mongoose')

const url = 'mongodb://admin:3141592653589@ds119988.mlab.com:19988/porobase'

mongoose.connect(url)
mongoose.Promise = global.Promise;

const userSchema  = mongoose.model('User', {
    name: String,
    id: Integer,
    snacks: Integer,
    weapon: { type: mongoose.Schema.Types.ObjectId, ref: 'Weapon' },
    helmet: { type: mongoose.Schema.Types.ObjectId, ref: 'Helmet' },
    footwear: { type: mongoose.Schema.Types.ObjectId, ref: 'Footwear' },
    misc: { type: mongoose.Schema.Types.ObjectId, ref: 'Misc' },
    mainPoro: { type: mongoose.Schema.Types.ObjectId, ref: 'Poro' },
    poros: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Poro' }],
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
    achievements: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Achievement' }]
})

userSchema.statics.format = (user) => {
    return{
        name: user.name,
        id: user.id,
        snacks: user.snacks,
        weapon: user.weapon,
        helmet: user.helmet,
        footwear: user.footwear,
        misc: user.misc,
        mainPoro: user.mainPoro,
        poros: user.poros,
        items: user.items,
        achievements: user.achievements
    }
}

const User = mongoose.model('User', userSchema)

module.exports = User