const initialState = {
    isLoading: true,
    timeList: [],
    selectedTimeIndex: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_APPOINTMENT_LIST_DATA':
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
};
