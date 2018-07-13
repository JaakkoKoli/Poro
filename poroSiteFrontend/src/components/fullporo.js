import React from 'react';
import { Card, Image, Button, List, Grid } from 'semantic-ui-react'
import Axios from 'axios';

const FullPoro = (props) => {
    const setMain = (e) => {
        Axios.get('/setmainporo?id='+poro._id+'&token='+props.access_token)
        props.user.mainporo=poro
        e.disabled=true
    }
    let poro = null
    if(props.user){
        poro = props.user.poros.find(p => p._id === props.id)
    }
    if(poro !== null && poro !== undefined){
        const source = require('../poros/' + poro.type.picture)
        return (
            <Grid>
                <Grid.Row>

                    <Grid.Column width={4}>
                    <Card>
                        <Card.Content textAlign="center">
                            <Card.Header>{poro.name}</Card.Header>
                            <Card.Meta>{'('+poro.type.name+')'}</Card.Meta>
                            <Card.Description>
                            <Image src={source} size='mini' centered={true} /><br />
                            {'level '+poro.level}
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra textAlign="center">
                            {poro.experience+' / '+poro.level*10+' experience to next level '}
                        </Card.Content>
                    </Card>
                    <Button onClick={() => setMain(document.getElementById("b1"))} id={"b1"}>Set as main Poro</Button>
                    </Grid.Column>

                    <Grid.Column width={12}>
                        <List divided>
                            <List.Item>
                            <List.Content floated="left">
                                <List.Header as="h2">Health</List.Header>
                            </List.Content>
                            <List.Content floated="right">
                                <List.Header as="h2">{poro.healthIV+poro.type.baseHealth+poro.type.healthGain*(poro.level-1)}</List.Header>
                            </List.Content>
                            </List.Item>

                            <List.Item>
                            <List.Content floated="left">
                                <List.Header as="h2">Attack</List.Header>
                            </List.Content>
                            <List.Content floated="right">
                                <List.Header as="h2">{poro.attackIV+poro.type.baseAttack+poro.type.attackGain*(poro.level-1)}</List.Header>
                            </List.Content>
                            </List.Item>

                            <List.Item>
                            <List.Content floated="left">
                                <List.Header as="h2">Defense</List.Header>
                            </List.Content>
                            <List.Content floated="right">
                                <List.Header as="h2">{poro.defenseIV+poro.type.baseDefense+poro.type.defenseGain*(poro.level-1)}</List.Header>
                            </List.Content>
                            </List.Item>

                            <List.Item>
                            <List.Content floated="left">
                                <List.Header as="h2">Stamina</List.Header>
                            </List.Content>
                            <List.Content floated="right">
                                <List.Header as="h2">{poro.staminaIV+poro.type.baseStamina+poro.type.staminaGain*(poro.level-1)}</List.Header>
                            </List.Content>
                            </List.Item>

                            <List.Item>
                            <List.Content floated="left">
                                <List.Header as="h2">Speed</List.Header>
                            </List.Content>
                            <List.Content floated="right">
                                <List.Header as="h2">{poro.speedIV+poro.type.baseSpeed+poro.type.speedGain*(poro.level-1)}</List.Header>
                            </List.Content>
                            </List.Item>
                        </List>
                    </Grid.Column>

                </Grid.Row>
            </Grid>
        )
    }else{
        return (
            <div>
            </div>
        )
    }
}

export default FullPoro