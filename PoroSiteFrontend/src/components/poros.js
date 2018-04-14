import React from 'react'
import Poro from './poro'
import { Card } from 'semantic-ui-react'

const Poros = (props) => {
  if(props.user===null){
    return(
      <div>
      You need to <a href="https://api.twitch.tv/kraken/oauth2/authorize?client_id=pho06vchppcq16eknimsbqagdxkxya&redirect_uri=https://poros.herokuapp.com/&response_type=code">log in</a> to view your poros.
      </div>
    )
  }
  return (
    <Card.Group>
      {props.user.poros.map(p => <Poro key={p._id} poro={p} history={props.history} />)}
    </Card.Group>
  )
}

export default Poros