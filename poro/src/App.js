import React from 'react'
import NoteForm from './components/NoteForm.js'
import NoteList from './components/NoteList.js'
import VisibilityFilter from './components/VisibilityFilter'
import { connect } from 'react-redux'
import { initializeNotes } from './reducers/noteReducer'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const Home = () => {
  <div>
    home
  </div>
}

const Shop = () => {
  <div>
    
  </div>
}

const Games = () => {
  <div>
    
  </div>
}

const Poros = () => {
  <div>
    
  </div>
}

const Inventory = () => {
  <div>
    
  </div>
}

const Porodex = () => {
  <div>
    
  </div>
}

const Profile = () => {
  <div>
    
  </div>
}

class App extends React.Component {
  componentWillMount() {
    this.props.initializeNotes()
  }

  render() {
    return (
      <div>
        <Router>
        <div>
          <div>
            <ul class="link">
              <li class="link"><Link to="/">home</Link></li> &nbsp;
              <li class="link"><Link to="/shop">shop</Link></li> &nbsp;
              <li class="link"><Link to="/games">games</Link></li> &nbsp; 
              <li class="link"><Link to="/about">about</Link></li>
            </ul>
          </div>
          <Route exact path="/" render={() => <Home />} />
          <Route path="/shop" render={() => <Shop />} />
          <Route path="/games" render={() => <Games />} />
          <Route path="/poros" render={() => <Poros />} />
          <Route path="/inventory" render={() => <Inventory />} />
          <Route path="/porodex/:id" render={() => <Porodex />} />
          <Route path="/profile/:id" render={() => <Profile />} />
        </div>
      </Router>
    </div>
    )
  }
}

export default connect(
  null,
  { initializeNotes }
)(App)