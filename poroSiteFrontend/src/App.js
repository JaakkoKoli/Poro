import React from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Home from './components/home'
import Porodex from './components/porodex'
import Shop from './components/shop'
import About from './components/about'
import User from './components/user'
import Poros from './components/poros'
import FullPoro from './components/fullporo'
import Inventory from './components/inventory'
import { Container, Menu, Dropdown, Dimmer, Loader } from 'semantic-ui-react'
import { connect } from "react-redux"
import { validateSession, login, set_user, logout } from './actions/userActions'

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
              <a href="https://api.twitch.tv/kraken/oauth2/authorize?client_id=pho06vchppcq16eknimsbqagdxkxya&redirect_uri=https://poros.herokuapp.com/&response_type=code">
              <Menu.Item className='link item' name='Login'>
                  Login
              </Menu.Item>
              </a>
              :
              <Menu.Item onClick={() => props.logout()} className='link item' name='Logout'>
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
          <br /><br />
          <Route exact path="/" render={() => <Home user={props.user} dispatch={props.dispatch} />} />
          <Route path="/porodex" render={() => <Porodex user={props.user} types={props.types} dispatch={props.dispatch} />} />
          <Route path="/shop" render={({history}) => <Shop user={props.user} set_user={set_user} history={history} dispatch={props.dispatch} />} />
          <Route path="/about" render={() => <About user={props.user} set_user={set_user} dispatch={props.dispatch} />} />
          <Route path="/profile" render={({history}) => <User user={props.user} history={history} dispatch={props.dispatch} />} />
          <Route exact path="/poros" render={({history}) => <Poros user={props.user} history={history} dispatch={props.dispatch} />} />
          <Route path="/poros/:id" render={({match}) => <FullPoro user={props.user} id={match.params.id} dispatch={props.dispatch} />} />
          <Route path="/inventory" render={() => <Inventory user={props.user} dispatch={props.dispatch} />} />
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
  }

  componentWillMount(){
    const loggedUserJSON = window.localStorage.getItem('loggedUserData')
    if (loggedUserJSON) {
      const data = JSON.parse(loggedUserJSON)
      if(data.session&&data.user.twitchid){
        this.props.dispatch({type: "FETCH_USER"})
        this.props.dispatch(validateSession(data.session, data.user.twitchid))
      }else{
        window.localStorage.clear()
      }
    }else if(window.location.href.indexOf('code=')!==-1){
      this.props.dispatch(login(window.location.href.split('=')[1].split('&')[0]))
    }
  }

  render() {
    return (
      <Container>
          <Dimmer active={this.props.user.fetching}>
            <Loader size='massive'>Loading</Loader>
          </Dimmer>
            <Links user={this.props.user.user} poro={this.props.poro} logout={() => this.props.dispatch(logout())}  dispatch={this.props.dispatch} />
            
      </Container>
    )
  }
}
// {this.state.popup ? <PoroPopup poro={this.state.user.mainporo} reason=' to celebrate coming here for the very first time!' /> : ''}
const ConnectedApp = connect(
  (store) => {
    return {
      user: store.user,
      poro: store.poro
    }
  }
)(App)
// poro: { poros: [], fetching: boolean, message: String, error: String }
// user: { user: {}, loggedin: boolean, session: String, fetching: boolean, message: String, error: String }
export default ConnectedApp;
