const initialState = {
    email: '',
    password: '',
    repeatPassword: '',
    agreements: true,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_EMAIL':
            return Object.assign({}, state, {email: action.payload});

        case 'SET_PASSWORD':
            return Object.assign({}, state, {password: action.payload});

        case 'SET_REPEAT_PASSWORD':
            return Object.assign({}, state, {repeatPassword: action.payload});

        case 'SET_AGREEMENTS':
            return Object.assign({}, state, {agreements: action.payload});

        default:
            return state;
    }
};
