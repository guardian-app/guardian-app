import { combineReducers } from 'redux';
import userReducer from './userReducer';
import childReducer from './childReducer';

export default combineReducers({
    userReducer,
    childReducer
});