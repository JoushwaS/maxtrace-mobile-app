import {IActionType} from '.';
import {SET_USER_DATA,CLEAR_USER_DATA} from '../types';

export interface IUserState {
	profileImage?: string;
	email?: string;
	createdAt: string;
	updatedAt: string;
	fullname: string;
	password: string;
}
const initialState: IUserState = {
	profileImage: '',
	email: '',
	createdAt: '',
	updatedAt: '',
	fullname: '',
	password: '',
};

export default (
	state: IUserState = initialState,
	action: IActionType,
): IUserState => {
	switch (action.type) {
		case SET_USER_DATA:
			return {
				...state,
				...action.payload,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			};
			
		case CLEAR_USER_DATA:
			return {
				profileImage: '',
				email: '',
				createdAt: '',
				updatedAt: '',
				fullname: '',
				password: '',
			};	
		default:
			return state;
	}
};
