const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const Poro = require('./models/poro')
const User = require('./models/user')
const Type = require('./models/type')
const porosRouter = require('./controllers/poros')
const usersRouter = require('./controllers/users')
const config = require('./utils/config')
const mongoose = require('mongoose')
const poroutils = require('./utils/poroutils')

mongoose
  .connect(config.mongoUrl)
  .then( () => {
    console.log('connected to database', config.mongoUrl)
  })
  .catch( err => {
    console.log(err)
  })

mongoose.Promise = global.Promise

app.use(cors())
app.use(bodyParser.json())
app.use('/api/poros', porosRouter)
app.use('/api/users', usersRouter)

app.get('/', async (request, response) => {
  try{
    if(request.query.code){
      const code = request.query.code
      const req='https://api.twitch.tv/api/oauth2/token?client_id='+client_id+'&client_secret='+secret+'&code='+code+'&grant_type=authorization_code&redirect_uri=http://localhost:3001'
      axios.post(req)
          .then(res=>{
            console.log(res.data)
            if(res.data.access_token){
              const config = {
                "headers": {
                  "Authorization": 'OAuth '+res.data.access_token,
                  "Accept": 'application/vnd.twitchtv.v5+json',
                  "Client-ID": client_id
                }
              }
              axios.get('https://api.twitch.tv/kraken', config)
                .then(r => {
                  if(!r.data.token.valid && !r.data.valid){
                    axios.post('https://api.twitch.tv/kraken/oauth2/token?grant_type=refresh_token&refresh_token='+res.data.refresh_token+'&client_id='+client_id+'&client_secret='+secret)
                      .then(r2 => {
                        console.log(r2.data)
                      })
                      .catch(e => console.log(e))
                  }else{
                    console.log(r.data)
                    console.log("ID: "+r.data.token.user_id+"; NAME: "+r.data.token.user_name)
                    currentUser = User.find({twitchid: r.data.token.user_id})
                    if(!currentUser){
                      const newUser = User({
                        username: r.data.token.user_name,
                        twitchid: r.data.token.user_id,
                        snacks: 0,
                        weapon: no_weapon,
                        mainporo: '0',
                        misc: no_misc,
                        helmet: no_misc,
                        footwear: no_footwear,
                        poros: [],
                        items: [],
                        achievements: []
                      })
                      await newUser.save()
                      currentUser = User.find({twitchid: r.data.token.user_id})
                      const types = await Type.find()
                      const newPoro = Poro(poroutils.getPoro(types, currentUser))
                      await newPoro.save()
                      newPoro = await Poro.find({owner: currentUser._id})
                      currentUser.mainporo=newPoro._id
                      await currentUser.save()
                    }
                  }
                })
                .catch(err => console.log(err))
            }
          })
          .catch(res=>console.log(res))
  }else{
    response.send('<div><a href="https://api.twitch.tv/kraken/oauth2/authorize?client_id='+client_id+'&redirect_uri=http://localhost:3001&response_type=code">authorise</a></div>')
  }
} catch (error){
    console.log(error)
    response.status(400).send({ error: 'unexpected error' })
  }
})

const server = http.createServer(app)

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app, server
}