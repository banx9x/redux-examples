import { ADD_TODO, REMOVE_TODO } from "../actions/actions";

const initialState = {
    todos: [],
};

const uid = () => Math.floor(Math.random() * 9001) + 1001;

export const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODO: {
            return {
                todos: [
                    ...state.todos,
                    {
                        id: uid(),
                        title: action.payload,
                    },
                ],
            };
        }

        case REMOVE_TODO: {
            return {
                todos: state.todos.filter((t) => t.id != action.payload),
            };
        }

        default: {
            return state;
        }
    }
};
