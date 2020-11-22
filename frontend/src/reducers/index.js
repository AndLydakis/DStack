import {combineReducers} from 'redux';
import account from './account';
import dragon from './dragon';
import generation from './generation';
import accountDragons from './accountDragons';

export default combineReducers({
    account,
    dragon,
    generation,
    accountDragons
});