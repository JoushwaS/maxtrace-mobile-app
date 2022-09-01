import {combineReducers} from 'redux';
import auth from './auth';
import todos from './todo';

//action type declaration
export interface IActionType {
	type: string;
	payload: any;
}

// combine all reducers
const rootReducer = combineReducers({
	auth,
	todos
});

export default rootReducer;
