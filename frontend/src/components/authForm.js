import React, {Component} from 'react';
import {connect} from "react-redux";
import {Button, FormGroup, FormControl} from "react-bootstrap";
import {signup} from "../actions/account";

class AuthForm extends Component {

    state = {
        username: '',
        password: ''
    }

    updateUsername = event => {
        this.setState({username: event.target.value});
    }

    updatePassword = event => {
        this.setState({password: event.target.value});
    }

    signup = () => {
        console.log('this.state', this.state);
        const {username, password} = this.state;
        console.log(username);
        console.log(password);
        this.props.signup({username, password})
    }

    login = () => {
        console.log('this.state', this.state);
    }

    render() {
        return (
            <div>
                <h2>Dragon Stack</h2>
                <FormGroup>
                    <FormControl
                        type="text"
                        value={this.state.username}
                        placeholder='username'
                        onChange={this.updateUsername}
                    />
                </FormGroup>

                <FormGroup>
                    <FormControl
                        type="password"
                        value={this.state.password}
                        placeholder='password'
                        onChange={this.updatePassword}
                    />
                </FormGroup>

                <div>
                    <Button onClick={this.login}>Log In</Button>
                    <span>or</span>
                    <Button onClick={this.signup}>Sing Up</Button>
                </div>

            </div>
        )
    }
}

export default connect(null, {signup})(AuthForm);
// export default AuthForm;