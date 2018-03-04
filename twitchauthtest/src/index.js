const axios = require('axios')
const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())


app.get('/', async (request, response) => {
    if(request.query.code){
        const code = request.query.code
        const req='https://api.twitch.tv/api/oauth2/token?client_id=pho06vchppcq16eknimsbqagdxkxya&client_secret=q5g6fchyrknt58zamrfo1nabsh0giz&code='+code+'&grant_type=authorization_code&redirect_uri=http://localhost:3000'
        axios.post(req)
            .then(res=>{
              console.log(res.data)
              if(res.data.access_token){
                const config = {
                  "headers": {
                    "Authorization": 'OAuth '+res.data.access_token,
                    "Accept": 'application/vnd.twitchtv.v5+json',
                    "Client-ID": 'pho06vchppcq16eknimsbqagdxkxya'
                  }
                }
                axios.get('https://api.twitch.tv/kraken', config)
                  .then(r => {
                    console.log(r.data)
                    console.log("ID: "+r.data.token.user_id+"; NAME: "+r.data.token.user_name)
                    if(!r.data.token.valid && !r.data.valid){
                      axios.post('https://api.twitch.tv/kraken/oauth2/token?grant_type=refresh_token&refresh_token='+res.data.refresh_token+'&client_id=pho06vchppcq16eknimsbqagdxkxya&client_secret=q5g6fchyrknt58zamrfo1nabsh0giz')
                        .then(r2 => {
                          console.log(r2.data)
                        })
                        .catch(e => console.log(e))
                    }
                  })
                  .catch(err => console.log(err))
              }
            })
            .catch(res=>console.log(res))
    }
    response.send('<div><a href="https://api.twitch.tv/kraken/oauth2/authorize?client_id=pho06vchppcq16eknimsbqagdxkxya&redirect_uri=http://localhost:3000&response_type=code">authorise</a></div>')
})


app.get('/login', async (request, response) => {
  if(request.query.code){
      const code = request.query.code
      const req='https://api.twitch.tv/api/oauth2/token?client_id=pho06vchppcq16eknimsbqagdxkxya&client_secret=q5g6fchyrknt58zamrfo1nabsh0giz&code='+code+'&grant_type=authorization_code&redirect_uri=http://localhost:3000'
      axios.post(req)
          .then(res=>{
            console.log(res.data)
            if(res.data.access_token){
              const config = {
                "headers": {
                  "Authorization": 'OAuth '+res.data.access_token,
                  "Accept": 'application/vnd.twitchtv.v5+json',
                  "Client-ID": 'pho06vchppcq16eknimsbqagdxkxya'
                }
              }
              axios.get('https://api.twitch.tv/kraken', config)
                .then(r => {
                  console.log(r.data)
                  console.log("ID: "+r.data.token.user_id+"; NAME: "+r.data.token.user_name)
                  response.json({username: r.data.token.user_name, user_id: r.data.token.user_id, access_token: res.data.access_token, refresh_token: res.data.refresh_token})
                })
                .catch(err => console.log(err))
            }
          })
          .catch(res=>console.log(res))
  }else{
    response.send({error: 'missing code'})
  }
})

const server = http.createServer(app)

const port = 3002
server.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

module.exports = {
  app, server
}