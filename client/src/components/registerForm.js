import React, { Fragment, Component } from 'react'

class RegisterForm extends Component {
   constructor(props){
       super(props)
   } 
   state = {
    response: '',
    post: '',
    responseToPost: '',
    username: '',
    password: '',
    file: ''
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
        const response = await fetch('/api/world', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                post: this.state.post,
                username: this.state.username,
                password: this.state.password,
                file: this.state.file
            }),
        });
        const body = await response.text();

        this.setState({ responseToPost: body });
    };

    render() {
        return (
            <Fragment>
                <p>{this.state.response}</p>
                <form onSubmit={this.handleSubmit} encType="multipart/form-data">
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
                        onChange={e => {
                            this.setState({ password: e.target.value })
                            console.log(e)
                        }}
                    /><hr />
                    <input
                        type="file"
                        value={this.state.file}
                        onChange={e => this.setState({ file: e.target.value })}
                    /><hr />
                    <button type="submit">Submit</button>
                </form>
                <p>{this.state.responseToPost}</p>
            </Fragment>
        );
    }
}
export default RegisterForm