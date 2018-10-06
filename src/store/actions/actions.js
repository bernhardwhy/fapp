import * as actionTypes from './actionTypes'
import axios from 'axios'

export const saveOffers = (products) => {
    return {
        type: actionTypes.SAVE_OFFERS,
        products: products
    }
}

export const getOffers = () => {
    return dispatch => {
        axios.get('https://jsonplaceholder.typicode.com/todos/1')
            .then(response => {
                console.log(response);

                dispatch(saveOffers(response.data));
            }).catch(error => {
                console.log(error);

            });
    }
};


