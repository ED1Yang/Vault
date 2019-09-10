import React, { Component } from 'react';
import Cookies from 'universal-cookie';

import Routes from './Routes'

import './assets/css/startPage.css'

const cookies = new Cookies();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userIsDefined: false,
      user:'',
    }
    this.handleAdminOnClick=this.handleAdminOnClick.bind(this);
    this.handleEmpOnClick=this.handleEmpOnClick.bind(this);
    this.handleClientOnClick=this.handleClientOnClick.bind(this);
  }
  handleAdminOnClick() {
    this.setState({userIsDefined:true,user:'admin'});
    cookies.set('userType','admin',{path:'/'});
  }

  handleEmpOnClick() {
    this.setState({userIsDefined:true,user:'emp'});
    cookies.set('userType','emp',{path:'/'});
  }

  handleClientOnClick() {
    this.setState({userIsDefined:true,user:'client'});
    cookies.set('userType','client',{path:'/'});
  }

  render() {
    if (cookies.get('userType')!== undefined) {
      return <Routes value={cookies.get('userType')}/>
    } else {
      return (
        <div className="startpage">
          <h1>Please select your role:</h1>
          <button className="button" onClick={this.handleAdminOnClick}>Admin</button>
          <button className="button" onClick={this.handleEmpOnClick}>Employee</button>
          <button className="button" onClick={this.handleClientOnClick}>Client</button>
          {/* <Route /> */}
        </div>
      );
    }
  }
}
