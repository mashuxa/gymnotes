const initialState = {};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_LISTING_DATA':
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
};
