import {listing} from "../constants";

const initialState = {
    users: [],
    startDate: '2019-01-01T09:00',
    endDate: '2020-01-01T18:00',
    textFilter: '',
    perPage: listing.COUNT_PER_PAGE,
    page: 1,
    count: null,
    isLoading: true,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USERS':
            return Object.assign({}, state, action.payload);

        case 'SET_START_DATE':
            return Object.assign({}, state, {startDate: action.payload});

        case 'SET_END_DATE':
            return Object.assign({}, state, {endDate: action.payload});

        case 'SET_TEXT_FILTER':
            return Object.assign({}, state, {textFilter: action.payload});

        default:
            return state;
    }
};
