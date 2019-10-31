import React, {Fragment } from 'react';
import logo from './logo.svg';
import './App.css';

const App1 = (props) => {
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
            </header>
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

        </div>
    )
}


export default App1;