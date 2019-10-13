const initialState = {
    isLoading: true,
    isUpdating: false,
    avatarSrc: '',
    avatar: null,
    name: '',
    phone: '',
    description: '',
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER_DATA':
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
};
