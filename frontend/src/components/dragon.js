import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import DragonAvatar from "./avatar";

const DEFAULT_DRAGON = {dragonId: '', generationId: '', nickname: '', birthdate: '', traits: []}

class Dragon extends Component {

    state = {
        dragon: DEFAULT_DRAGON
    }

    fetchDragon = () => {
        fetch('http://localhost:3000/dragon/new')
            .then(response => response.json())
            .then(json => this.setState({dragon: json.dragon}))
            .catch(err => console.log('Could not fetch dragon', err));
    }

    componentDidMount = () => {
        this.fetchDragon();
    }

    render() {
        return <div>
            <Button onClick={this.fetchDragon}>New Dragon</Button>
            <DragonAvatar dragon={this.state.dragon}/>
        </div>
    }
}

export default Dragon;