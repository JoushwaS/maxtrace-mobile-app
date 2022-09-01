import { SET_USER_DATA,CLEAR_USER_DATA} from '../types';

const setUserData = (payload: any) =>{
	return{
		type : SET_USER_DATA,
		payload
	}
}

const clearUserData = () =>{
	return{
		type : CLEAR_USER_DATA,
	}
}

export {setUserData,clearUserData};
