import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

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
            <Router>
            <div>
                <div>
                <Link to="/">home</Link> &nbsp;
                <Link to="/notes">notes</Link> &nbsp;
                <Link to="/users">users</Link>
                </div>
                <Route exact path="/" render={() => <Home />} />
                <Route path="/notes" render={() => <Notes />} />
                <Route path="/users" render={() => <Users />} />
            </div>
            </Router>
        </div>
    )
  }
}