import React from 'react';
import axios from 'axios';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Home from './components/home'
import Porodex from './components/porodex'
import Shop from './components/shop'
import About from './components/about'
import User from './components/user'
import Poros from './components/poros'
import Inventory from './components/inventory'
import { Container, Menu, Dropdown } from 'semantic-ui-react'

const Links = (props) => {
  return (
    <div>
      <Router>
        <div>
          <div>
            <Menu>
              <Link to="/">
              <Menu.Item className='link item' name='Home'>
                Home
              </Menu.Item>
              </Link>
              <Link to="/porodex">
              <Menu.Item className='link item' name='Porodex'>
                Porodex
              </Menu.Item>
              </Link>
              <Link to="/shop">
              <Menu.Item className='link item' name='Shop'>
                Shop
              </Menu.Item>
              </Link>
              {props.user !== null  ? 
              <Dropdown text={props.user.name} className='link item'  name={props.user.name}>
                <Dropdown.Menu>
                  <Link to="/profile"><Dropdown.Item>Profile</Dropdown.Item></Link>
                  <Link to="/poros"><Dropdown.Item>Poros</Dropdown.Item></Link>
                 <Link to="/inventory"><Dropdown.Item>Inventory</Dropdown.Item></Link>
                </Dropdown.Menu>
              </Dropdown>
              : ''}
              <Link to="/about">
              <Menu.Item className='link item'  name='About'>
                About
              </Menu.Item>
              </Link>
              {props.user === null ?
              <a href="https://api.twitch.tv/kraken/oauth2/authorize?client_id=pho06vchppcq16eknimsbqagdxkxya&redirect_uri=http://localhost:3000&response_type=code">
              <Menu.Item className='link item' name='Login'>
                  Login
              </Menu.Item>
              </a>
              :
              <Menu.Item onClick={props.logout()} className='link item' name='Logout'>
                  Logout
              </Menu.Item>
              }
              {
                props.user === null ? null : 
              <Menu.Item>
                You currently have {props.user.snacks} snacks
              </Menu.Item>
              }
            </Menu>

          </div>
          <Route exact path="/" render={() => <Home user={props.user} access_token={props.access_token} refresh_token={props.refresh_token} />} />
          <Route path="/porodex" render={() => <Porodex user={props.user} types={props.types} access_token={props.access_token} refresh_token={props.refresh_token} />} />
          <Route path="/shop" render={() => <Shop user={props.user} access_token={props.access_token} refresh_token={props.refresh_token} set_user={props.set_user} />} />
          <Route path="/about" render={() => <About user={props.user} access_token={props.access_token} refresh_token={props.refresh_token} />} />
          <Route path="/profile" render={() => <User user={props.user} access_token={props.access_token} refresh_token={props.refresh_token} />} />
          <Route path="/poros" render={() => <Poros user={props.user} access_token={props.access_token} refresh_token={props.refresh_token} />} />
          <Route path="/inventory" render={() => <Inventory user={props.user} access_token={props.access_token} refresh_token={props.refresh_token} />} />
        </div>
      </Router>
    </div>
  )
}

const PoroPopup = (props) => {
  const source = require('./poros/'+props.poro.type.picture)
  return(
    <div>
      <table width="400px" height="200px" outline-style="solid">
        <tbody>
          <tr><td><h3>{'You have received '+props.poro.name+props.reason}</h3></td></tr>
          <tr><td><img src={source} alt="not found" /></td></tr>
          <tr><td>{props.poro.name}</td></tr>
        </tbody>
      </table>
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      access_token: null,
      refresh_token: null,
      code: window.location.href,
      popup: null
    }
  }

  logout = () => () => {
    window.localStorage.clear()
    this.setState({user: null, access_token: null, refresh_token: null})
  }

  setUser = (user) => {
    this.setState({user: user})
  }

  saveUser = () => {
    window.localStorage.setItem('loggedUserData', JSON.stringify({access_token: this.state.access_token, refresh_token: this.state.refresh_token}))
  }

  setUserData = () => {
    axios.get('http://localhost:3001/login?'+this.state.code)
        .then(res => {
          console.log(res)
          this.setState({
            user: res.data.user,
            access_token: res.data.access_token,
            refresh_token: res.data.refresh_token,
            popup: res.data.new_account
          }, this.saveUser)
          window.setTimeout(function(){this.setState({popup: null})}.bind(this),4000)
        })
        .catch(e => console.log(e))
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
      console.log(res)
      this.setState({
        user: res.data.user,
        access_token: res.data.access_token,
        refresh_token: res.data.refresh_token
      }, this.saveUser)
    })
    .catch(e => console.log(e))
  }

  componentWillMount(){
    const loggedUserJSON = window.localStorage.getItem('loggedUserData')
    if (loggedUserJSON) {
      const data = JSON.parse(loggedUserJSON)
      if(data.access_token&&data.refresh_token){
        this.setState({ access_token: data.access_token, refresh_token: data.refresh_token }, this.updateUserData)
      }else if(this.state.code.includes('code=')){
        this.setState({code: this.state.code.split('?')[1].split('&')[0]}, this.setUserData)
      }
    }
  }
  

  render() {
    return (
      <Container>
        <Links user={this.state.user} access_token={this.state.access_token} refresh_token={this.state.refresh_token} set_user={this.setUser.bind(this)} logout={this.logout} />
        {this.state.popup ? <PoroPopup poro={this.state.user.mainporo} reason=' to celebrate coming here for the very first time!' /> : ''}
      </Container>
    )
  }
}

export default App;
