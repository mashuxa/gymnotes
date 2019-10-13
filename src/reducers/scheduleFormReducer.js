const initialState = {
    startDate: new Date(Date.now()).toISOString().split('T')[0],
    endDate: new Date(Date.now()).toISOString().split('T')[0],
    weekDays: {
        sun: true,
        mon: true,
        tue: true,
        wed: true,
        thu: true,
        fri: true,
        sat: true,
    },
    timeList: ['09:00'],
    selectedTimeIndex: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SCHEDULE_FORM_DATA':
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
};
