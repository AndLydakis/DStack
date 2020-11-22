import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Dragon from './dragon';
import Generation from './generation';
import {logout} from '../actions/account'

class Home extends Component {
    render() {
        return (
            <div>
                <Button onClick={this.props.logout} className='logout-button'>Log Out</Button>
                <h2>DragonStack</h2>
                <Generation/>
                <Dragon/>
                <hr />
                <Link to='/account-dragons'>Account Dragons</Link>
            </div>
        )
    }
}



export default connect(
    null,
    {logout}
)(Home);