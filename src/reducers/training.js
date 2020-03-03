import actionTypes from "../actionTypes";

const initialState = {
  currentTraining: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_EXERCISES_TO_TRAINING:
      return {currentTraining: action.payload};

    default:
      return state;
  }
};
