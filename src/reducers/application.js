import actionTypes from "../actionTypes";
const initialState = {
    exercises: [],
    exercisesHistory: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_EXERCISES:
            return Object.assign({}, state, {exercises: action.payload});

        default:
            return state;
    }
};
