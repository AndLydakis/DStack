import React, {Component} from "react";
import {Button} from "react-bootstrap"
import Dragon from './dragon';
import Generation from './generation';
import {connect} from 'react-redux';
import {logout} from '../actions/account'

class Home extends Component{
    render(){
        return(
            <div>
                <h2>DragonStack</h2>
                <Generation/>
                <Dragon/>
                <Button onClick={this.props.logout} className='logout-button'>Log Out</Button>
            </div>
        )
    }
}

export default connect(
    null,
    {logout}
)(Home);