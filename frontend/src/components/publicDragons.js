import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchPublicDragons} from '../actions/publicDragons';
import {fetchAccountDragons} from '../actions/accountDragons';
import PublicDragonRow from './publicDragonRow';

class PublicDragons extends Component {

    componentDidMount() {
        this.props.fetchPublicDragons();
        this.props.fetchAccountDragons();
    }

    render() {
        console.log('public dragons', this.props.publicDragons.dragons);
        return (
            <div>
                <h3>Public Dragons</h3>

                <Link to='/'>Home</Link>
                {
                    this.props.publicDragons.dragons.map(dragon => {
                        return (
                            <div key={dragon.dragonId}>
                                <PublicDragonRow dragon={dragon}/>
                                <hr/>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default connect(
    ({publicDragons}) => ({publicDragons}),
    {fetchPublicDragons, fetchAccountDragons}
)(PublicDragons);