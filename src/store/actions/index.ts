import {IActionType} from '../reducers';

export const createAction = (type: string, payload: any): IActionType => {
	return {type, payload};
};

export * from './auth';
export * from './todo';
