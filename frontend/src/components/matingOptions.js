import React, {Component} from 'react';
import {Button} from 'react-bootstrap'
import {connect} from "react-redux";
import {BACKEND} from '../config';
import history from '../history';


class MatingOptions extends Component {

    mate = ({matronDragonId, patronDragonId}) => () => {
        fetch(`${BACKEND.url}/dragon/mate`, {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({matronDragonId, patronDragonId})
        }).then(response => response.json())
            .then(json => {
                alert(json.message);

                if (json.type !== 'error') {
                    history.push('/account-dragons');
                }
            })
            .catch(error => alert(error.message));
    }

    render() {
        console.log('accountDragons: ', this.props.accountDragons.dragons)
        return (
            <div>
                <h4>Pick one of your dragons</h4>
                {
                    this.props.accountDragons.dragons.map(dragon => {
                        const {dragonId, generationId, nickname} = dragon;
                        return (
                            <span key={dragonId}>
                                <Button onClick={
                                    this.mate({
                                        matronDragonId: dragon.dragonId,
                                        patronDragonId: this.props.patronDragonId
                                    })}>
                                    Generation: {generationId}. Dragon: {dragonId}. Name: {nickname}
                                </Button>
                                {' '}
                            </span>
                        )
                    })
                }
            </div>
        )
    }
}

export default connect(
    ({accountDragons}) => ({accountDragons}),
    null
)(MatingOptions)