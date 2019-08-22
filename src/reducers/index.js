import initialState from '../store/initState';
import {
    ADD_TODO,
    UPDATE_TODO,
    DELETE_TODO,
} from '../actions/types';

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODO:
            let id = state.id + 1;

            return {
                ...state,
                todos: [...state.todos, { id, ...action.payload }],
                id,
            };
        case UPDATE_TODO:
            let todos = state.todos.map(todo => {
                if (todo.id === action.payload.id) {
                    todo = { ...todo, ...action.payload };
                }

                return todo;
            });

            return {
                ...state,
                todos,
            };
        case DELETE_TODO:
            return {
                todos: state.todos.filter(todo => todo.id !== action.payload.id),
                id: state.id,
            };
        default:
            return state;
    }
}

export default appReducer;