import actionTypes from "../actionTypes";

const initialState = {
  exercises: {},
  exercisesHistory: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_EXERCISES:
      return {
        ...state, exercises: action.payload.reduce((obj, item) => {
          return {
            ...obj,
            [item.id]: item,
          };
        }, {})
      };

    default:
      return state;
  }
};
