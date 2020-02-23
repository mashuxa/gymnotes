import actionTypes from "../actionTypes";

const initialState = {
  currentTraining: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_EXERCISE:
      return {currentTraining: [...state.currentTraining, ...action.payload]};

    default:
      return state;
  }
};
