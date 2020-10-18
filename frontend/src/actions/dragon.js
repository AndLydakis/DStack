import {DRAGON} from './types';
import {BACKEND} from '../config';

export const fetchDragon = () => (dispatch) => {
    dispatch({type: DRAGON.FETCH});
    return fetch(`${BACKEND.url}/dragon/new`)
        .then(response => {
            console.log('dragon fetch response: ', response);
            response.json().then(json => {
                if (json.type === 'error') {
                    dispatch({type: DRAGON.FETCH_ERROR, message: json.message});
                } else {
                    dispatch({type: DRAGON.FETCH_SUCCESS, dragon: json.dragon});
                }
            })
        })
        .catch(err => {
            dispatch({type: DRAGON.FETCH_ERROR, message: err.message});
        });
}