const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const axios = require('axios')
const cors = require('cors')
const Poro = require('./models/poro')
const User = require('./models/user')
const Type = require('./models/type')
const porosRouter = require('./controllers/poros')
const usersRouter = require('./controllers/users')
const typesRouter = require('./controllers/types')
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
app.use('/api/types', typesRouter)


app.get('/validate', (request, response)  => {
  const conf = {
    "headers": {
      "Authorization": 'OAuth '+request.get('access_token'),
      "Accept": 'application/vnd.twitchtv.v5+json',
      "Client-ID": conf.client_id
    }
  }
  axios.get('https://api.twitch.tv/kraken', conf)
    .then(r => {
      if(!r.data.token.valid && !r.data.valid){
        axios.post('https://api.twitch.tv/kraken/oauth2/token?grant_type=refresh_token&refresh_token='+refresh_token+'&client_id='+config.client_id+'&client_secret='+config.secret)
          .then(r2 => {
            if(r2.data.access_token && r2.data.refresh_token){
              response.send({valid: true, access_token: r2.data.access_token, refresh_token: r2.data.refresh_token})
            }
          })
          .catch(e => {
            console.log(e)
            response.send({valid: false, access_token, refresh_token})
          })
      }else{
        User.find({twitchid: r.data.token.user_id})
          .then(user => {
            user=user[0]
            if(r.data.token.user_name!=user.name){
              User(user).save()
                .then(() => {
                  response.send({valid: true, user, access_token: r.data.access_token, refresh_token: r.data.refresh_token})
                })
            }else{
              response.send({valid: true, user, access_token: r.data.access_token, refresh_token: r.data.refresh_token})
            }
          })
        response.send({valid: true, access_token, refresh_token})
        
      }
    })
    .catch(err => console.log(err))
}

app.get('/', (request, response) => {
  Type.find({})
    .then(types => {
      const poro = poroutils.getPoro(types, "123123123")
      response.json(poro)
    }).catch(error => response.json({error}))
})

app.get('/addsnacks', (request, response) => {
  if(request.query.token===config.token&&request.query.username&&request.query.amount){
    User.find({name: request.query.username})
      .then(user => {
        User.findByIdAndUpdate(user[0]._id, {$set: {snacks: user[0].snacks+Number(request.query.amount)}})
          .populate({path:'poros', populate: {path: 'type', model: 'Type'}})
          .populate({path:'mainporo', populate: {path: 'type', model: 'Type'}})
          .then(res => {
            response.send({user: res})
          }).catch(() => response.send('error3'))
      }).catch(() => response.send('error2'))
  }else{
    response.send('error1')
  }
})

app.get('/buyporo', (request, response) => {
  if(request.get('access_token')){
    const conf = {
      "headers": {
        "Authorization": 'OAuth '+request.get('access_token'),
        "Accept": 'application/vnd.twitchtv.v5+json',
        "Client-ID": config.client_id
      }
    }
    axios.get('https://api.twitch.tv/kraken', conf)
      .then(res => {
        if(res.data.token.user_id){
          User.find({twitchid: res.data.token.user_id})
            .populate('poros')
            .then(user => {
              if(user[0].snacks>=100){
                Type.find({})
                  .then(types => {
                    const poro = poroutils.getPoro(types, user._id)
                    Poro(poro).save()
                      .then(p => {
                        const poros = user[0].poros.concat(p._id)
                        User.findByIdAndUpdate(user[0]._id, { $set: {poros: poros, snacks: user[0].snacks-100}})
                          .populate({path:'poros', populate: {path: 'type', model: 'Type'}})
                          .populate({path:'mainporo', populate: {path: 'type', model: 'Type'}})
                          .then(u => {
                            u.snacks-=100
                            response.send({new_poro: poro, user: u})
                          }).catch(err => console.log(err))
                      })
                  }).catch(err => console.log(err))
              }else{
                response.send({error: 'not enough snacks'})
              }
            }).catch(err => console.log(err))
        }else{
          response.send({error: 'invalid session'})
        }
      }).catch(err => console.log(err))
  }else{
    response.send({error: 'invalid session'})
  }
})

app.get('/data', (request, response) => {
  Type.find({})
    .then(types => response.send({types: types}))
})

app.get('/login', (request, response) => {
  if(request.query.code){
      const code = request.query.code
      const req='https://api.twitch.tv/api/oauth2/token?client_id=pho06vchppcq16eknimsbqagdxkxya&client_secret=q5g6fchyrknt58zamrfo1nabsh0giz&code='+code+'&grant_type=authorization_code&redirect_uri=http://localhost:3000'
      axios.post(req)
          .then(res=>{
            if(res.data.access_token){
              const conf = {
                "headers": {
                  "Authorization": 'OAuth '+res.data.access_token,
                  "Accept": 'application/vnd.twitchtv.v5+json',
                  "Client-ID": config.client_id
                }
              }
              axios.get('https://api.twitch.tv/kraken', conf)
                .then(r => {
                  User.find({twitchid: r.data.token.user_id})
                  .then(currentUser => {
                    if(currentUser.length===0){
                      const newUser = User({
                        name: r.data.token.user_name,
                        twitchid: r.data.token.user_id,
                        snacks: 0,
                        picture: '',
                        weapon: config.no_weapon,
                        mainporo: "5a989b64734d1d3e5b2dbb2d",
                        misc: config.no_misc,
                        helmet: config.no_misc,
                        footwear: config.no_footwear,
                        poros: [],
                        items: [],
                        achievements: []
                      })
                      newUser.save().then((currentUser2) => {
                        User.find({twitchid: r.data.token.user_id})
                          Type.find()
                            .then(types => {
                              var newPoro = poroutils.getPoro(types, currentUser2._id)
                              Poro(newPoro).save()
                                .then((newPoro2) => {
                                  currentUser2.mainporo = newPoro2._id
                                  if(currentUser2.poros === undefined){
                                    currentUser2.poros = [newPoro2._id]
                                  }else{
                                    currentUser2.poros = currentUser2.poros.concat(newPoro2._id)
                                  }
                                  axios.post('https://id.twitch.tv/oauth2/token?client_id='+config.client_id+'&client_secret='+config.secret+'&grant_type=client_credentials')
                                    .then(res2 => {
                                      const conf2 = {
                                        "headers": {
                                          "Authorization": 'OAuth '+res2.data.access_token,
                                          "Accept": 'application/vnd.twitchtv.v5+json',
                                          "Client-ID": config.client_id
                                        }
                                      }
                                      axios.get('https://api.twitch.tv/helix/users?id='+r.data.token.user_id, conf2)
                                        .then(userData => {
                                          console.log(userData.data)
                                          console.log(userData.data.data)
                                          console.log(userData.data.data[0])
                                          console.log(userData.data.data[0].profile_image_url)
                                          currentUser2.picture=userData.data.data[0].profile_image_url
                                          User.findByIdAndUpdate(currentUser2._id,{ $set: {mainporo: currentUser2.mainporo, poros: currentUser2.poros, picture: currentUser2.picture}})
                                            .then(() => {
                                              User.findById(currentUser2._id)
                                                .populate({path:'poros', populate: {path: 'type', model: 'Type'}})
                                                .populate({path:'mainporo', populate: {path: 'type', model: 'Type'}})
                                                .then(user1 => {
                                                  response.send({user: user1, new_account: true, access_token: res.data.access_token, refresh_token: res.data.refresh_token})
                                                }).catch(err => console.log(err))
                                            }).catch(err => console.log(err))
                                        }).catch(err => console.log(err))
                                  }).catch(err => console.log(err))
                                }).catch(err => console.log(err))
                          }).catch(err => console.log(err))
                      }).catch(err => console.log(err))
                    }else{
                      User.findById(currentUser[0]._id)
                        .populate({path:'poros', populate: {path: 'type', model: 'Type'}})
                        .populate({path:'mainporo', populate: {path: 'type', model: 'Type'}})
                        .then(user1 => {
                          response.send({user: user1, new_account: false, access_token: res.data.access_token, refresh_token: res.data.refresh_token})
                        }).catch(err => console.log(err))
                    }
                  }).catch(err => console.log(err))
                }).catch(err => console.log(err))
            }
          })
          .catch(res=>console.log(res))
  }else{
    response.send({error: 'missing code'})
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