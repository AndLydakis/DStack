import {combineReducers} from 'redux';
import account from './account';
import dragon from './dragon';
import generation from './generation';

export default combineReducers({account, dragon, generation});