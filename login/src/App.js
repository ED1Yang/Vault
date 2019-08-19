import React, { Component } from 'react';
import './App.css';

//simple login

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      error: '',
      url:'',
    };

    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dismissError = this.dismissError.bind(this);
    this.handlePostJSON = this.handlePostJSON.bind(this)

  }

  dismissError() {
    this.setState({ error: '' });
  }

  handleSubmit(evt) {
    evt.preventDefault();

    if (!this.state.username) {
      return this.setState({ error: 'Username is required' });
    }

    if (!this.state.password) {
      return this.setState({ error: 'Password is required' });
    }

    return this.setState({ error: '' });
  }

  handleUserChange(evt) {
    this.setState({
      username: evt.target.value,
    });
  };

  handlePassChange(evt) {
    this.setState({
      password: evt.target.value,
    });
  }

  handlePostJSON() {
    let formData = new FormData();
    formData.append('username',this.state.username);
    formData.append('password',this.state.password); 
		fetch(
      		'http://localhost/api/login',
		  {method: 'POST', body: formData}
		)
		  .then(res => res.json())
		  .then(data => {
      this.setState({url: data})
      window.location = "http://192.168.1.29/"+this.state.url.Msg;
		  })
      .catch(e => console.log('error:', e))
  }

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          {
            this.state.error &&
            <h3 data-test="error" onClick={this.dismissError}>
              <button onClick={this.dismissError}>✖</button>
              {this.state.error}
            </h3>
          }
          <label>User Name</label>
          <input type="text" data-test="username" placeholder="username" value={this.state.username} onChange={this.handleUserChange} />

          <label>Password</label>
          <input type="password" data-test="password" placeholder="password" value={this.state.password} onChange={this.handlePassChange} />

          <input type="submit" value="Log In" data-test="submit" onClick={this.handlePostJSON}/>
        </form>
      </div>
    );
  }
}

export default App;