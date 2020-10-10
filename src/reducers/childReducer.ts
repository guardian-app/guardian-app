import { User } from '../types';

const initialState = {
    error: '',
    message: '',
    children: []
};

export default function reducer(state = initialState, action: any) {
    switch (action.type) {
        case 'CHILD_FETCH_SUCCESS':
            return { ...state, children: action.children, error: '' }
        case 'CHILD_FETCH_FAILURE':
            return { ...state, error: action.error }
        case 'CHILD_ADD_READY':
            return { ...state, error: '', message: '' }
        case 'CHILD_ADD_SUCCESS':
            return { ...state, children: [...state.children, action.child], error: '', message: action.message }
        case 'CHILD_ADD_FAILURE':
            return { ...state, error: action.error, message: '' }
        case 'CHILD_DELETE_COMPLETE':
            return { ...state, children: state.children.filter((child: User) => child.user_id !== action.child.user_id) }
        default:
            return state;
    };
};