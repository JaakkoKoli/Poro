import React from 'react'
import axios from 'axios'
import Poro from './poro'
import { Button, Image, Card } from 'semantic-ui-react'

class Shop extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: props.user,
      access_token: props.access_token,
      refresh_token: props.refresh_token,
      new_poro: null,
      set_user: props.set_user
    }
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

  saveUser = () => {
    window.localStorage.setItem('loggedUserData', JSON.stringify({access_token: this.state.access_token, refresh_token: this.state.refresh_token}))
  }

  componentWillMount(){
    const loggedUserJSON = window.localStorage.getItem('loggedUserData')
    if (loggedUserJSON) {
      const data = JSON.parse(loggedUserJSON)
      if(data.access_token&&data.refresh_token){
        this.setState({ access_token: data.access_token, refresh_token: data.refresh_token }, this.updateUserData)
      }
    }
  }

  buyPoro = () => () => {
    if(this.state.user!==null){
      if(this.state.user.snacks>=100){
        const config = {
          "headers": {
            "access_token": this.state.access_token
          }
        }
        axios.get('http://localhost:3001/buyporo', config)
          .then(res => {
            if(res.data.user&&res.data.new_poro){
              this.state.set_user(res.data.user)
              this.setState({
                user: res.data.user,
                new_poro: res.data.new_poro
              })
            }else{
              console.log("error")
            }
          })
      }
    }
  }

  render(){
    const source = require('../poros/mysteryporo.png')
      return (
      <div>
        {this.state.user !== null ?      
        this.state.new_poro===null ? 
        
        <Card centered>
          <Card.Content textAlign="center">
              <Card.Header><h2>Random Poro</h2></Card.Header>
              <Card.Meta>100 snacks</Card.Meta>
              <Card.Description>
                <Image src={source} />
              </Card.Description>
          </Card.Content>
          <Card.Content extra textAlign="center">
            <Button onClick={this.buyPoro()}>Buy</Button> 
          </Card.Content>
      </Card>

        : 

        <Card centered>
          <Card.Content textAlign="center">
            <h3>You received</h3>
          </Card.Content>
          <Card.Content textAlign="center">
            <Poro poro={this.state.new_poro} />
          </Card.Content>
          <Card.Content extra textAlign="center">
          <Button onClick={() => this.setState({new_poro: null})}>back</Button>
          </Card.Content>
      </Card>

        :''}
        <br />
      </div>
    )
  }
}
//<Poro poro={this.state.new_poro} />
export default Shop