import React, { Component } from 'react';
import Routes from './Routes'

import './assets/css/startPage.css'

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
    console.log('onclick function');
    this.setState({userIsDefined:true,user:'admin'});
  }

  handleEmpOnClick() {
    console.log('onclick function');
    this.setState({userIsDefined:true,user:'emp'});
  }

  handleClientOnClick() {
    console.log('onclick function');
    this.setState({userIsDefined:true,user:'client'});
  }

  render() {
    if (this.state.userIsDefined) {
      return <Routes value={this.state.user}/>
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
