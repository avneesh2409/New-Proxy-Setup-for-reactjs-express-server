import React, { Component, Fragment } from 'react';
import axios from 'axios'
import logo from './logo.svg';

import './App.css';

class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
    username: '',
    password: '',
    file: '',
    check:false
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  handleSubmit = async e => {
    e.preventDefault();
    const response = await axios('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: JSON.stringify({
        post: this.state.post,
        username: this.state.username,
        password: this.state.password,
        file: this.state.file
      }),
    });
    const body = await response;
console.log(body)
  };
clickHandler=()=>{
  if(this.state.check)
  {
    this.setState({
      check:false
    })
  
  }
  else{
    this.setState({
      check:true
    })
  
  }
}
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <button onClick={this.clickHandler}>Login</button>
          <button onClick={this.clickHandler}>Register</button>
        </header>
        {
          (this.state.check) ?
            <Fragment>
              <h1>Register Here</h1>
              <p>{this.state.response}</p>
              <form onSubmit={this.handleSubmit}>
                <p>
                  <strong>Post to Server:</strong>
                </p>
                <input
                  placeholder="enter a text"
                  type="text"
                  value={this.state.post}
                  onChange={e => this.setState({ post: e.target.value })}
                />
                <hr />
                <input
                  placeholder="enter a username"
                  type="text"
                  value={this.state.username}
                  onChange={e => this.setState({ username: e.target.value })}
                />
                <hr />
                <input
                  placeholder="enter the password"
                  type="password"
                  value={this.state.password}
                  onChange={e => this.setState({ password: e.target.value })}
                /><hr />
                <input
                  type="file"
                  value={this.state.file}
                  onChange={e => this.setState({file:e.target.value})}
                /><hr />
                <button type="submit">Submit</button>
              </form>
            
            </Fragment>
            :
            <Fragment>
              <h1>Login Here</h1>
              <form>
                <p><input type="text" name="username" /></p>
                <p><input type="password" name="password" /></p>
                <p><button type="submit" >Log In</button></p>
              </form>
            </Fragment>
        }
      </div>
    );
  }
}

export default App;