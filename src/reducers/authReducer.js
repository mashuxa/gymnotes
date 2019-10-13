const initialState = {
    email: '',
    password: '',
    repeatPassword: '',
    agreements: true,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_AUTH_DATA':
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
};
