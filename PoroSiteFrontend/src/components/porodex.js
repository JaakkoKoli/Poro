import React from 'react'
import axios from 'axios'
import { Table, Image, Icon } from 'semantic-ui-react'

const Poro = (props) => {
  const source = require('../poros/'+props.type.picture)
  return(
    <Table.Row>
      <Table.Cell>
        <Image src={source} alt="not found" />
      </Table.Cell>
      <Table.Cell>
        {props.type.name}
      </Table.Cell>
      <Table.Cell>
        {props.rarity[props.type.rarity]}
      </Table.Cell>
      <Table.Cell>
        {props.user !== null ? (props.owned.filter(id => id===props.type._id).length>0 ? <Icon name="checkmark" color="green" size="large" /> : <Icon name="remove" color="red" size="large" />) : <Icon name="remove" color="red" size="large" />}
      </Table.Cell>
    </Table.Row>
  )
}


class Porodex extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: props.user,
      types: [],
      owned: [],
      rarity: ['unavailable','ultra rare','very rare','rare','uncommon','common']
    }
  }

  saveUser = () => {
    window.localStorage.setItem('loggedUserData', JSON.stringify({access_token: this.state.access_token, refresh_token: this.state.refresh_token}))
    this.setOwned()
  }

  setOwned(){
    this.setState({owned: this.state.user!==null ? this.state.user.poros.map(poro => poro.type._id) : []})
  }
  
  updateUserData = () => {
    const config = {
      "headers": {
        "access_token": this.state.access_token,
        "refresh_token": this.state.refresh_token
      }
    }
    axios.get('http://localhost:3001/validate', config)
    .then(res => {
      this.setState({
        user: res.data.user,
        access_token: res.data.access_token,
        refresh_token: res.data.refresh_token
      }, this.saveUser)
    })
    .catch(e => console.log(e))
  }

  componentDidMount(){
    axios.get('http://localhost:3001/data')
        .then(res => {
          this.setState({
            types: res.data.types
          }, this.getUser)
        })
        .catch(e => console.log(e))
  }

  getUser = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedUserData')
    if (loggedUserJSON) {
      const data = JSON.parse(loggedUserJSON)
      if(data.access_token&&data.refresh_token){
        this.setState({ access_token: data.access_token, refresh_token: data.refresh_token }, this.updateUserData)
      }
    }
  }
  
  render (){
    return(
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              Poro
            </Table.HeaderCell>
            <Table.HeaderCell>
              Name
            </Table.HeaderCell>
            <Table.HeaderCell>
              Rarity
            </Table.HeaderCell>
            <Table.HeaderCell>
              Owned
            </Table.HeaderCell>
          </Table.Row>
          </Table.Header>
          <Table.Body>
          {this.state.types.map(t => <Poro key={t._id} type={t} user={this.state.user} owned={this.state.owned} rarity={this.state.rarity} />)}
        </Table.Body>
      </Table>
    )
  }
}

export default Porodex