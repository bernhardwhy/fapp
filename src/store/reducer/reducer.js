import * as actionTypes from '../actions/actionTypes'

const initalState = {
    breadCrumbs: {
        route: '',
        routeLabel: '',
    }
}

const reducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.SAVE_TRAININGS:
            return {
                ...state,
                trainings: action.trainings
            }
        case actionTypes.SAVE_WORKOUT:
            return {
                ...state,
                workout: action.workoutToSave
            }
        case actionTypes.SET_BREADCRUMBS:
            return {
                ...state,
                breadCrumbs: action.breadCrumbs
            }
        case actionTypes.SET_ACTUALTRAINING:
            return {
                ...state,
                exerciseData: action.exerciseData
            }
        default:
            return state;
    }
}

export default reducer;