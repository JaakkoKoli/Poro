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

const Links = (props) => {
  return (
    <div>
      <Router>
        <div>
          <div>
            <Link to="/">home</Link> &nbsp;
                <Link to="/porodex">porodex</Link> &nbsp;
                <Link to="/shop">shop</Link> &nbsp;
                <Link to="/about">about</Link> &nbsp;
                <Link to="/profile">profile</Link> &nbsp;
                <Link to="/poros">poros</Link> &nbsp;
                <Link to="/inventory">inventory</Link> 
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

  setUser(user){
    this.setState({user: user})
  }

  setUserData(){
    axios.get('http://localhost:3001/login?'+this.state.code)
        .then(res => {
          this.setState({
            user: res.data.user,
            access_token: res.data.access_token,
            refresh_token: res.data.refresh_token,
            popup: res.data.new_account
          })
        })
        .catch(e => console.log(e))
  }

  componentWillMount(){
    if(this.state.code.includes('code=')){
      this.setState({code: this.state.code.split('?')[1].split('&')[0]}, this.setUserData)
    }
  }
  

  render() {
    return (
      <div>
        {this.state.user === null ?  <div><a href="https://api.twitch.tv/kraken/oauth2/authorize?client_id=pho06vchppcq16eknimsbqagdxkxya&redirect_uri=http://localhost:3000&response_type=code">authorise</a></div> : 'logged in as '+this.state.user.name+' --- '+this.state.user.snacks+' snacks'}
        <Links user={this.state.user} access_token={this.state.access_token} refresh_token={this.state.refresh_token} set_user={this.setUser.bind(this)} />
        {this.state.popup ? <PoroPopup poro={this.state.user.mainporo} reason=' to celebrate coming here for the very first time!' /> : ''}
      </div>
    )
  }
}

export default App;
