import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import DragonAvatar from "./avatar";
import {fetchDragon} from '../actions/dragon';
import fetchStates from '../reducers/fetchStates';


class Dragon extends Component {

    get DragonView() {

        const {dragon }= this.props
        if (dragon.status === fetchStates.error) {
            return <span>{dragon.message}</span>
        }
        return <DragonAvatar dragon={this.props.dragon}/>;
    }

    render() {
        return (
            <div>
                <Button onClick={this.props.fetchDragon}>New Dragon</Button>
                {this.DragonView}
            </div>
        )
    }
}

export default connect(
    ({dragon}) => ({dragon}), //inline MapStateToProps,
    {fetchDragon} //inline MapDispatchToProps
)(Dragon);