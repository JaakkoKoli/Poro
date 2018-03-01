import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      home
        </div>
  )
}

const Porodex = () => {
  return (
    <div>
      porodex
        </div>
  )
}

const Shop = () => {
  return (
    <div>
      shop
        </div>
  )
}

const About = () => {
  return (
    <div>
      about
        </div>
  )
}

const User = () => {
  return (
    <div>
      user
        </div>
  )
}

const Poros = () => {
  return (
    <div>
      poros
        </div>
  )
}

const Inventory = () => {
  return (
    <div>
      Inventory
        </div>
  )
}

const Links = () => {
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
          <Route exact path="/" render={() => <Home />} />
          <Route path="/porodex" render={() => <Porodex />} />
          <Route path="/shop" render={() => <Shop />} />
          <Route path="/about" render={() => <About />} />
          <Route path="/profile" render={() => <User />} />
          <Route path="/poros" render={() => <Poros />} />
          <Route path="/inventory" render={() => <Inventory />} />
        </div>
      </Router>
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNum: '',
      search: '',
    }
  }

  render() {
    return (
      <div>
        <Links />
      </div>
    )
  }
}

export default App;
