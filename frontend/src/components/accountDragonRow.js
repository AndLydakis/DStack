import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import DragonAvatar from './avatar';
import {BACKEND} from '../config';

class AccountDragonRow extends Component {
    state = {
        nickname: this.props.dragon.nickname,
        editing: false
    }

    updateNickname = event => {
        this.setState({nickname: event.target.value});
    }

    toggleEdit = () => {
        this.setState({editing: !this.state.editing})
    }

    save = () => {
        fetch(
            `${BACKEND.url}/dragon/update`,
            {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    dragonId: this.props.dragon.dragonId,
                    nickname: this.state.nickname
                })
            })
            .then(response => response.json())
            .then(json => {
                if (json.type === 'error') {
                    alert(json.message);
                } else {
                    this.toggleEdit();
                }
            })
            .catch(error => alert(error.message));
    }

    get saveButton() {
        return <Button onClick={this.save}>Save</Button>
    }

    get editButton() {
        return <Button onClick={this.toggleEdit}>Edit</Button>
    }

    render() {
        console.log('accountdragonrow', this.props.dragon);
        return (
            <div>
                <div>{this.props.dragon.nickname}</div>
                <input
                    type='text'
                    value={this.state.nickame}
                    onChange={this.updateNickname}
                    disabled={!this.state.editing}
                />
                <br/>
                <DragonAvatar dragon={this.props.dragon}/>
                {
                    this.state.editing ? this.saveButton : this.editButton
                }
            </div>
        )
    }
}

export default AccountDragonRow;
