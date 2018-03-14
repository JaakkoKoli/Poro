import React from 'react';
import { Card, Image } from 'semantic-ui-react'

const Poro = (props) => {
  const source = require('../poros/'+props.poro.type.picture)
  if(props.history){
    return(
        <Card centered onClick={() => props.history.push('/poros/'+props.poro._id)}>
        <Card.Content textAlign="center">
          <Card.Header>{props.poro.name}</Card.Header>
          <Card.Meta>{'('+props.poro.type.name+')'}</Card.Meta>
          <Card.Description>
          <Image src={source} size='mini' centered={true} /><br />
          {'level '+props.poro.level}
          </Card.Description>
        </Card.Content>
        <Card.Content extra textAlign="center">
          {props.poro.experience+' / '+props.poro.level*10+' experience to next level '}
        </Card.Content>
      </Card>
    )
  }else{
    return(
        <Card centered>
        <Card.Content textAlign="center">
          <Card.Header>{props.poro.name}</Card.Header>
          <Card.Meta>{'('+props.poro.type.name+')'}</Card.Meta>
          <Card.Description>
          <Image src={source} size='mini' centered={true} /><br />
          {'level '+props.poro.level}
          </Card.Description>
        </Card.Content>
        <Card.Content extra textAlign="center">
          {props.poro.experience+' / '+props.poro.level*10+' experience to next level '}
        </Card.Content>
      </Card>
    )
  }
}

export default Poro