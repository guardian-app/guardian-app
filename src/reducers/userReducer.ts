const initialState = {
    currentUser: {},
    authenticateError: '',
    createMessage: '',
    createError: ''
}

export default function reducer(state = initialState, action: any) {
    switch (action.type) {
        case 'USER_AUTHENTICATE_SUCCESS':
            return { ...state, currentUser: action.payload, authenticateError: '' }
        case 'USER_AUTHENTICATE_FAILURE':
            return { ...state, authenticateError: action.error, currentUser: {} }
        case 'USER_CREATE_SUCCESS':
            return { ...state, createMessage: action.message, createError: '' }
        case 'USER_CREATE_FAILURE':
            return { ...state, createError: action.error, createMessage: '' }
        default:
            return state;
    };
}