const initialState = {
    date: new Date(Date.now()).toISOString().split('T')[0],
    listExistingDates: '',
    isCalendarLoading: false,
    appointments: null,
    clients: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER_SCHEDULE_DATA':
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
};
