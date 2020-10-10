import React, {Component} from 'react';

const DEFAULT_GENERATION = {id: '', expiration: ''};
const MINIMUM_DELAY = 3000;

class Generation extends Component {

    state = {
        generation: {
            DEFAULT_GENERATION
        }
    };

    timer = null;

    componentDidMount() {
        console.log('Fetching generation');
        this.fetchNextGeneration();
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    fetchGeneration = () => {
        fetch('http://localhost:3000/generation')
            .then(response => {
                console.log('fetch response: ', response);
                response.json().then(json => {
                    console.log('json ', json)
                    this.setState({generation: json.generation});
                })
            })
            .catch(err => {
                console.error('Could not fetch generation')
            });
    }

    fetchNextGeneration = () => {
        this.fetchGeneration();

        let delay = (new Date(this.state.generation.expiration)).getTime() - (new Date()).getTime();

        delay = Math.max(delay, MINIMUM_DELAY);
        this.timer = setTimeout(() => this.fetchNextGeneration(), delay);
    }

    render() {
        console.log('Rendering Generation Component');
        const {generation} = this.state;
        const date_string = (new Date(generation.expiration)).toString()
        return <div>
            <h3>Generation {generation.id}.Expires on:</h3>
            <h4>{date_string}</h4>
        </div>
    }
}

export default Generation;