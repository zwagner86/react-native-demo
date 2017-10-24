import {combineReducers} from 'redux';
import facilitiesReducer from './facilities';

export default combineReducers({
    facilities: facilitiesReducer
});
