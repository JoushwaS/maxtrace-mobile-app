import {IActionType} from '.';
import {ADD_TODO,REMOVE_TODO,CLEAR_ALL_TODOS} from '../types';

interface ITodo {
	name: string;
	createdAt: string;
    updatedAt: string;
    completed : boolean
}
const initialState: any = [];

export default (
	state: any = initialState,
	action: IActionType,
): [] => {
	switch (action.type) {
		case ADD_TODO:
            const todos : any = [...state];
            todos.push(action.payload);
			return todos;
			
		case REMOVE_TODO:
			const myTodos : any = [...state];
            myTodos.splice(0,action.payload)
            return todos;
            
        case CLEAR_ALL_TODOS:
            return []	
		default:
			return state;
	}
};
