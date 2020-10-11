import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchGeneration} from '../actions/generation';
import fetchStates from '../reducers/fetchStates';

const MINIMUM_DELAY = 3000;

class Generation extends Component {

    timer = null;

    componentDidMount() {
        console.log('Fetching generation');
        this.fetchNextGeneration();
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    fetchNextGeneration = () => {
        this.props.fetchGeneration();
        let delay = (new Date(this.props.generation.expiration)).getTime() - (new Date()).getTime();
        delay = Math.max(delay, MINIMUM_DELAY);
        this.timer = setTimeout(() => this.fetchNextGeneration(), delay);
    }

    render() {
        console.log('Rendering Generation Component props', this.props);
        const {generation} = this.props;
        const date_string = (new Date(generation.expiration)).toString();
        // if (generation.status === fetchStates.fetching) {
        //     return <div>...</div>
        // }
        if (generation.status === fetchStates.error) {
            return <div>Error Fetching Generation: {generation.status} </div>
        }
        return <div>
            <h3>Generation {generation.id}.Expires on:</h3>
            <h4>{date_string}</h4>
        </div>
    }
}

const mapStateToProps = (state) => {
    const generation = state.generation;
    return {generation: generation};
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         // dispatchGeneration: generation => dispatch(generationActionCreator(generation)),
//         fetchGeneration: () => fetchGeneration(dispatch)
//     }
// };

const componentConnector = connect(
    mapStateToProps,
    {fetchGeneration}
);

export default componentConnector(Generation);