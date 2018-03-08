import React from 'react';
import { Card, Image } from 'semantic-ui-react'

const Poro = (props) => {
  const source = require('../poros/'+props.p.type.picture)
  return(
    <td>
      <Card>
      <Image src={source} size='mini' centered={true} />
      <Card.Content>
        <Card.Header>{props.p.name}</Card.Header>
        <Card.Meta>{'('+props.p.type.name+')'}</Card.Meta>
        <Card.Description>{'level '+props.p.level}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        {props.p.experience+' / '+props.p.level*10+' experience to next level '}
      </Card.Content>
    </Card>
    </td>
  )
}

const PoroRow = (props) => {
  return (
    <tr>
      {props.poros.map(poro => <Poro p={poro} key={poro._id} /> )}
    </tr>
  )
}

const Poros = (props) => {
  if(props.user===null){
    return(
      <div>
      You need to <a href="https://api.twitch.tv/kraken/oauth2/authorize?client_id=pho06vchppcq16eknimsbqagdxkxya&redirect_uri=http://localhost:3000&response_type=code">log in</a> to view your poros.
      </div>
    )
  }
  const r = Math.max(Math.floor(window.innerWidth / 600), 1)
  const poroList=[]
  var pointer=-1
  for(var i=0;i<props.user.poros.length;i++){
    if(i%r===0){
      pointer++
      poroList[pointer]=[]
    }
    poroList[pointer][i%r]=props.user.poros[i]
  }
  return (
    <table>
      <tbody>
        {poroList.map(l=> <PoroRow poros={l} key={l[0]._id} />)}
      </tbody>
    </table>
  )
}

export default Poros