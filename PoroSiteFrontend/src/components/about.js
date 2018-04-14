import React from 'react'
import { Button } from 'semantic-ui-react'
import axios from 'axios'

const addSnacks = (user, set_user) => () => {
  axios.get('/addsnacks?username='+user.name+'&token=mc42qtgn047nmwae&amount=500')
    .then(res => {
      var u=res.data.user
      u.snacks=user.snacks+500
      set_user(u)
    }).catch(exception => {
      console.log(exception)
    })
}

const About = (props) => {
  return (
    <div>
      <h1>About</h1>
      <p>
      This is an early development version, and thus is missing a lot of features, and has most likely a lot of bugs.
      Because this version is meant for testing purposes, all data will be completely wiped upon official release.
      </p>
      {props.user ? <div>Get 500 snacks <Button onClick={addSnacks(props.user, props.set_user)}>get snacks</Button></div> : ''}
    </div>
  )
}

export default About