import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import DragonAvatar from './avatar';
import {BACKEND} from '../config';

class AccountDragonRow extends Component {
    state = {
        nickname: this.props.dragon.nickname,
        isPublic: this.props.dragon.isPublic,
        saleValue: this.props.dragon.saleValue,
        sireValue: this.props.dragon.sireValue,
        editing: false,
    }

    updateNickname = event => {
        this.setState({nickname: event.target.value});
    }

    updatePublic = event => {
        this.setState({isPublic: event.target.checked});
    }

    updateSaleValue = event => {
        this.setState({saleValue: parseInt(event.target.value)});
    }

    updateSireValue = event => {
        this.setState({sireValue: parseInt(event.target.value)});
    }

    toggleEdit = () => {
        this.setState({editing: !this.state.editing})
    }

    save = () => {
        console.log('save', this.state);
        fetch(
            `${BACKEND.url}/dragon/update`,
            {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    dragonId: this.props.dragon.dragonId,
                    nickname: this.state.nickname,
                    isPublic: this.state.isPublic,
                    saleValue: this.state.saleValue,
                    sireValue: this.state.sireValue
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
                    value={this.state.nickname}
                    onChange={this.updateNickname}
                    disabled={!this.state.editing}
                />

                <br/>
                <DragonAvatar dragon={this.props.dragon}/>
                <div>
                    <span>
                        Sale Value: {' '}
                        <input
                            className='account-dragon-row-input'
                            type='number'
                            value={this.state.saleValue}
                            disabled={!this.state.editing}
                            onChange={this.updateSaleValue}
                        />
                    </span>{' '}
                    <span>
                        Sire Value: {' '}
                        <input
                            className='account-dragon-row-input'
                            type='number'
                            value={this.state.sireValue}
                            disabled={!this.state.editing}
                            onChange={this.updateSireValue}
                        />
                    </span>{' '}
                    <span>
                        Public: {' '}
                        <input
                            type='checkbox'
                            disabled={!this.state.editing}
                            checked={this.state.isPublic}
                            onChange={this.updatePublic}
                        />
                    </span>
                    {
                        this.state.editing ? this.saveButton : this.editButton
                    }
                </div>
            </div>
        )
    }
}

export default AccountDragonRow;
