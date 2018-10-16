/* global gapi */

import React, { Component } from 'react';
import { Row, Col,  Button, Panel, PanelGroup, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';
import SubmitCourseID from './SubmitCourseID'
import EmailList from './EmailList'

//import Login from './components/Login'

import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100) // fake async
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100) // fake async
  }
}

const Public       = () => <h3>Public</h3>
const Protected    = () => <h3>Protected</h3>

// create private method inside component class
const PrivateRoute = ({ component: Component, ...rest }) => (
    // spread all rest props onto route
    <Route {...rest} render = {(props) => (
        fakeAuth.isAuthenticated === true
          // if authenticated, pass normal props to component (location, match, history)
          ? <Component { ...props } />
          // if not authenticated, redirect user to Login
          : <Redirect to = {{
              pathname: '/login', 
              state: { from: props.location }
            }} />
      )} />
  )

class Login extends React.Component {
  state = {
    redirectToReferrer: false
  }
  login = () => {
    fakeAuth.authenticate(() => {
      this.setState(() => ({
        redirectToReferrer: true
      }))
    })
  }
  render(){
    const { redirectToReferrer } = this.state
    const { from } = this.props.location.state || {from: { pathname: '/'}}

    if (redirectToReferrer === true) {
      return (
        <Redirect to = { from } />
      )
    }
    return (
      <div>
        <p>You must log in to view this page</p>
        <button onClick = {this.login}>Login</button>
      </div>
    )
  }
}




class App extends Component {
 // constructor(props, context) {
 //   super(props, context);
 //   this.state = {
  
 //   };
 // }

  render(){
    return (
      <Router>
        <div>
          <ul>
            <li> <Link to = '/public'> Public Page </Link> </li>
            <li> <Link to = '/protected'> Protected Page </Link> </li>
          </ul>
          <Route path = '/public' component = { Public } />
          <Route path = '/login' component = { Login } />
          <PrivateRoute path = '/protected' component = { Protected } />
        </div>
      </Router>
    );
  }
}

export default App;



















