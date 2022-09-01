import { ADD_TODO,REMOVE_TODO } from '../types';

const addTodo = (payload: any) =>{
	return{
		type : ADD_TODO,
		payload
	}
}

const removeTodo = (payload: any) =>{
	return{
		type : REMOVE_TODO,
		payload
	}
}

export {addTodo,removeTodo};
