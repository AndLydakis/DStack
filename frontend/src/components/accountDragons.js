import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchAccountDragons} from '../actions/accountDragons';
import AccountDragonRow from './accountDragonRow';

class AccountDragons extends Component{

    componentDidMount(){
        this.props.fetchAccountDragons();
    }

    render(){
        console.log('prop dragons', this.props.accountDragons.dragons);
        return(
            <div>
                <h3>Account Dragons</h3>
                {
                    this.props.accountDragons.dragons.map(
                        dragon=>{
                            return(
                                <div key={dragon.dragonId}>
                                    <AccountDragonRow dragon={dragon}/>
                                    <hr/>
                                </div>
                            )
                        }
                    )
                }
                <Link to='/'>Home</Link>
            </div>
        )
    }
}

export default connect(
    ({accountDragons})=>({accountDragons}),
    {fetchAccountDragons}
)(AccountDragons);