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
        case 'SET_LISTING_DATA':
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
};
