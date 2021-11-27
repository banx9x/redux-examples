import {
    LOAD_REQUESTED,
    LOAD_DONE,
    LOAD_FAILED,
    ADD_REQUESTED,
    ADD_DONE,
    ADD_FAILED,
    COMPLETE_REQUESTED,
    COMPLETE_DONE,
    COMPLETE_FAILED,
    DELETE_REQUESTED,
    DELETE_DONE,
    DELETE_FAILED,
} from "../actions/actionTypes";

const initialState = {
    loading: false,
    adding: null,
    completing: null,
    deleting: null,
    error: null,
    todos: [],
};

export const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_REQUESTED: {
            return { ...state, loading: true };
        }

        case LOAD_DONE: {
            return {
                ...state,
                loading: false,
                todos: action.payload,
            };
        }

        case LOAD_FAILED: {
            return { ...state, loading: false, error: action.payload };
        }

        case ADD_REQUESTED: {
            return { ...state, adding: true, error: null };
        }

        case ADD_DONE: {
            return {
                ...state,
                adding: false,
                todos: [...state.todos, action.payload],
                error: null,
            };
        }

        case ADD_FAILED: {
            return { ...state, adding: false, error: action.payload };
        }

        case COMPLETE_REQUESTED: {
            return { ...state, completing: action.payload, error: null };
        }

        case COMPLETE_DONE: {
            return {
                ...state,
                completing: null,
                todos: state.todos.map((t) =>
                    t.id === action.payload ? { ...t, completed: true } : t
                ),
                error: null,
            };
        }

        case COMPLETE_FAILED: {
            return {
                ...state,
                completing: null,
                error: action.payload,
            };
        }

        case DELETE_REQUESTED: {
            return {
                ...state,
                deleting: action.payload,
                error: null,
            };
        }

        case DELETE_DONE: {
            return {
                ...state,
                deleting: null,
                todos: state.todos.filter((t) => t.id !== action.payload),
                error: null,
            };
        }

        case DELETE_FAILED: {
            return {
                ...state,
                deleting: null,
                error: action.payload,
            };
        }

        default: {
            return state;
        }
    }
};
