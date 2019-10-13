const initialState = {
    isLoading: true,
    isShownScheduleForm: false,
    timeList: '',
    selectedTimeIndex: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SCHEDULE_LIST_DATA':
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
};
