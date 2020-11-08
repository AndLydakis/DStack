import React, {Component} from 'react';
import Home from './home.js'
import AuthForm from './authForm.js'

class Root extends Component {
    render() {
        return (false ? <Home/> : <AuthForm/>)
    }
}

export default Root