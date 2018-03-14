import React from 'react'
import Poro from './poro'
import { Image, Table, Grid, List } from 'semantic-ui-react'

const User = (props) => {
  if (props.user !== null) {
    const statBonus = props.user.helmet.statchange.concat(props.user.misc.statchange.concat(props.user.weapon.statchange.concat(props.user.footwear.statchange)))
    const flatBonus = [statBonus.filter(bonus => bonus.stat === "health" && bonus.flat).reduce((a,b) => a + b, 0),
                      statBonus.filter(bonus => bonus.stat === "attack" && bonus.flat).reduce((a,b) => a + b, 0),
                      statBonus.filter(bonus => bonus.stat === "defense" && bonus.flat).reduce((a,b) => a + b, 0),
                      statBonus.filter(bonus => bonus.stat === "stamina" && bonus.flat).reduce((a,b) => a + b, 0),
                      statBonus.filter(bonus => bonus.stat === "speed" && bonus.flat).reduce((a,b) => a + b, 0)
                      ]

    const nonFlatBonus = [statBonus.filter(bonus => bonus.stat === "health" && !bonus.flat).reduce((a,b) => a + b, 0),
                      statBonus.filter(bonus => bonus.stat === "attack" && !bonus.flat).reduce((a,b) => a + b, 0),
                      statBonus.filter(bonus => bonus.stat === "defense" && !bonus.flat).reduce((a,b) => a + b, 0),
                      statBonus.filter(bonus => bonus.stat === "stamina" && !bonus.flat).reduce((a,b) => a + b, 0),
                      statBonus.filter(bonus => bonus.stat === "speed" && !bonus.flat).reduce((a,b) => a + b, 0)
                      ]
    console.log(flatBonus, nonFlatBonus)
    return (

      <Table celled structured textAlign="center">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell><h2>User</h2></Table.HeaderCell>
            <Table.HeaderCell><h2>Main Poro</h2></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>

              <Grid>
                <Grid.Row>
                  <Grid.Column width={8}>
                    <h2>{props.user.name}</h2>
                    <Image src={props.user.picture} size="small" />
                  </Grid.Column>
                  <Grid.Column width={8}>

                    <List celled>
                      <List.Item>
                        <List.Content floated="left">
                          <List.Header>Helmet</List.Header>
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Content floated="left">
                          <List.Header>{props.user.helmet.name}</List.Header>
                          <List.Description>{props.user.helmet.description}</List.Description>
                        </List.Content>
                      </List.Item>
                      {props.user.helmet.statchange.map(bonus => 
                        <List.Item>
                          <List.Content floated="left">
                            <List.Description>{bonus.amount.toString()+(bonus.flat ? ' ' : '% ')+bonus.stat}</List.Description>
                          </List.Content>
                        </List.Item>
                      )}
                    </List>

                    <List celled>
                      <List.Item>
                        <List.Content floated="left">
                          <List.Header>Weapon</List.Header>
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Content floated="left">
                          <List.Header>{props.user.weapon.name}</List.Header>
                          <List.Description>{props.user.weapon.description}</List.Description>
                        </List.Content>
                      </List.Item>
                      {props.user.weapon.statchange.map(bonus => 
                        <List.Item>
                          <List.Content floated="left">
                            <List.Description>{bonus.amount.toString()+(bonus.flat ? ' ' : '% ')+bonus.stat}</List.Description>
                          </List.Content>
                        </List.Item>
                      )}
                    </List>

                    <List celled>
                      <List.Item>
                        <List.Content floated="left">
                          <List.Header>Miscellaneous</List.Header>
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Content floated="left">
                          <List.Header>{props.user.misc.name}</List.Header>
                          <List.Description>{props.user.misc.description}</List.Description>
                        </List.Content>
                      </List.Item>
                      {props.user.misc.statchange.map(bonus => 
                        <List.Item>
                          <List.Content floated="left">
                            <List.Description>{bonus.amount.toString()+(bonus.flat ? ' ' : '% ')+bonus.stat}</List.Description>
                          </List.Content>
                        </List.Item>
                      )}
                    </List>

                    <List celled>
                      <List.Item>
                        <List.Content floated="left">
                          <List.Header>Footwear</List.Header>
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Content floated="left">
                          <List.Header>{props.user.footwear.name}</List.Header>
                          <List.Description>{props.user.footwear.description}</List.Description>
                        </List.Content>
                      </List.Item>
                      {props.user.footwear.statchange.map(bonus => 
                        <List.Item>
                          <List.Content floated="left">
                            <List.Description>{bonus.amount.toString()+(bonus.flat ? ' ' : '% ')+bonus.stat}</List.Description>
                          </List.Content>
                        </List.Item>
                      )}
                    </List>

                  </Grid.Column>
                </Grid.Row>
              </Grid>


            </Table.Cell>
            <Table.Cell textAlign="center">

              <Poro history={props.history} poro={props.user.mainporo} />

            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    )
  } else {
    return (
      <div>
      </div>
    )
  }
}

export default User