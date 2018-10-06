import * as actionTypes from '../actions/actionTypes'

const initalState = {

}

const reducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.SAVE_OFFERS:
            console.log(action.products);

            return {
                ...state,
                products: action.products
            }
        default:
            return state;
    }
}

export default reducer;