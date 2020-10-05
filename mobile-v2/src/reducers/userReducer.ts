const initialState = {
    tokenValidated: false,
    loggedIn: false,
    token: '',
    currentUser: {},
    authenticateError: '',
    createMessage: '',
    createError: '',
    resetRequestError: '',
    resetRequestMessage: '',
    resetError: '',
    resetMessage: '',
};

export default function reducer(state = initialState, action: any) {
    switch (action.type) {
        case 'USER_AUTHENTICATE_READY':
            return { ...state, currentUser: {}, loggedIn: false, authenticateError: '', token: '', createMessage: '', resetMessage: '' }
        case 'USER_AUTHENTICATE_SUCCESS':
            return { ...state, currentUser: action.user, loggedIn: true, token: action.token }
        case 'USER_AUTHENTICATE_FAILURE':
            return { ...state, authenticateError: action.error }
        case 'USER_CREATE_READY':
            return { ...state, createMessage: '', createError: '' }
        case 'USER_CREATE_SUCCESS':
            return { ...state, createMessage: action.message }
        case 'USER_CREATE_FAILURE':
            return { ...state, createError: action.error }
        case 'USER_RESET_PASSWORD_REQUEST_READY':
            return { ...state, resetRequestMessage: '', resetRequestError: '' }
        case 'USER_RESET_PASSWORD_REQUEST_SUCCESS':
            return { ...state, resetRequestMessage: action.message }
        case 'USER_RESET_PASSWORD_REQUEST_FAILURE':
            return { ...state, resetRequestError: action.error }
        case 'USER_RESET_PASSWORD_READY':
            return { ...state, resetMessage: '', resetError: '' }
        case 'USER_RESET_PASSWORD_SUCCESS':
            return { ...state, resetMessage: action.message, resetError: '' }
        case 'USER_RESET_PASSWORD_FAILURE':
            return { ...state, resetError: action.error, resetMessage: '' }
        case 'USER_LOGOUT_COMPLETE':
            return { ...initialState }
        case 'USER_VALIDATE_TOKEN_COMPLETE':
            return { ...state, tokenValidated: true }
        default:
            return state;
    };
};