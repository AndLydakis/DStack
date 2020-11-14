import React, {Component} from 'react';
import {connect} from "react-redux";
import Home from './home.js'
import AuthForm from './authForm.js'

class Root extends Component {
    render() {
        return (this.props.account.loggedIn ? <Home/> : <AuthForm/>)
    }
}

export default connect(
    ({account}) => ({account}),
    null
)(Root);