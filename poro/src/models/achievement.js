const mongoose = require('mongoose')

const url = 'mongodb://admin:3141592653589@ds119988.mlab.com:19988/porobase'

mongoose.connect(url)
mongoose.Promise = global.Promise;

const achievementSchema = mongoose.model('Achievement', {
    name: String,
    description: String,
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
})

achievementSchema.statics.format = (achievement) => {
    return{
        name: achievement.name,
        description: achievement.description,
        users: achievement.users
    }
}

const Achievement = mongoose.model('Achievement', achievementSchema)

module.exports = Achievement