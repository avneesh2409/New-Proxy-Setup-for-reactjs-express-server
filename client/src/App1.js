import React, { Component,Fragment } from 'react';
import logo from './logo.svg';
import './App.css';

class App1 extends Component {
    state = {
        check:false,
        text:"Sign In"
    }
    clickHandler=()=>{
        if(!this.state.check)
        {
            this.setState({
                check:!this.state.check,
                text:"Sign In"
            })
    
        }
        else{
            this.setState({
                check:!this.state.check,
                text:"Sign Up"
            })
    
        }
            }
    render(){
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />

                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
          </a>
                    <button onClick={this.clickHandler} >{this.state.text}</button>
                </header>
                {
                    (this.state.check) ?
                        <Fragment>
                            <h1>Register Here</h1>
                            <hr />
                            <form action="api/world/" method="post" enctype="multipart/form-data">

                                <input
                                    placeholder="enter a username"
                                    type="text"
                                    name="username"
                                />
                                <hr />
                                <input
                                    placeholder="enter the password"
                                    type="password"
                                    name="password"
                                /><hr />
                                <input
                                    type="file"
                                    name="file"
                                /><hr />
                                <input type="submit" />
                            </form>

                        </Fragment>
                        :
                        <Fragment>
                            <h1>Login Here</h1>
                            <hr />
                            <form action="api/login/" method="post">

                                <input
                                    placeholder="enter a username"
                                    type="text"
                                    name="username"
                                />
                                <hr />
                                <input
                                    placeholder="enter the password"
                                    type="password"
                                    name="password"
                                /><hr />
                                <input type="submit" />
                            </form>

                        </Fragment>
                }
            </div>
        )
    }
}


export default App1;