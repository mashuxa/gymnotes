const initialState = {
    date: new Date(Date.now()).toISOString().split('T')[0],
    userData: null,
    listExistingDates: [],
    selectedDate: null,
    isCalendarLoading: true,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CONTRACTOR_CALENDAR_DATA':
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
};
