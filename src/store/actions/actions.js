import * as actionTypes from './actionTypes'
import * as exData from './exData.json';
import axios from 'axios';

export const setBreadCrumbs = (breadCrumbs) => {
    return {
        type: actionTypes.SET_BREADCRUMBS,
        breadCrumbs: breadCrumbs
    }
}

export const setActualTraining = (exerciseData) => {
    return {
        type: actionTypes.SET_ACTUALTRAINING,
        exerciseData: exerciseData
    }
}

export const saveOffers = (trainings) => {
    return {
        type: actionTypes.SAVE_TRAININGS,
        trainings: trainings
    }
}

export const saveWorkouts = (workoutToSave) => {
    return {
        type: actionTypes.SAVE_WORKOUT,
        workoutToSave: workoutToSave
    }
}

export const getWorkouts = (workout) => {
    const url = 'https://fapp-c83e2.firebaseio.com/finishedWorkouts.json?orderBy="name"&limitToFirst=10&equalTo="' + workout + '"';
    return dispatch => {
        axios.get(url)
            .then(response => {
                console.log('training request', response);
                var propValueArray = [];
                let propValue = null;
                for (var propName in response.data) {
                    if (response.data.hasOwnProperty(propName)) {
                        propValueArray.push(response.data[ propName ]);
                        console.log(propValueArray);
                        if (!propValue) {
                            propValue = response.data[ propName ];
                        }
                        const dateInArray = Date.parse(response.data[ propName ].finishedDate);
                        const dateSelectedProp = Date.parse(propValue.finishedDate);
                        if (dateSelectedProp < dateInArray) {
                            propValue = response.data[ propName ];
                        }
                    }
                }
                dispatch(setActualTraining(propValue));
            })
            .catch(error => {
                console.log(error);

            });
    }
};

export const getOffers = () => {
    return dispatch => {
        axios.get('https://fapp-c83e2.firebaseio.com/trainings.json')
            .then(response => {
                console.log(response);
                dispatch(saveOffers(response.data));
            })
            .catch(error => {
                console.log(error);

            });
    }
};

export const postWorkout = (finishedWorkout) => {
    return dispatch => {
        axios.post('https://fapp-c83e2.firebaseio.com/finishedWorkouts.json', finishedWorkout)
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }
}
