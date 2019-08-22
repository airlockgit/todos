import {
    ADD_TODO,
    UPDATE_TODO,
    DELETE_TODO,
} from '../actions/types';

export const addTodo = ({ title, checked = false }) => ({
    type: ADD_TODO,
    payload: {
        title,
        checked,
    }
});

export const updateTodo = ({ id, ...rest }) => ({
    type: UPDATE_TODO,
    payload: {
        id,
        ...rest,
    }
});

export const deleteTodo = (id) => ({
    type: DELETE_TODO,
    payload: {
        id,
    }
})