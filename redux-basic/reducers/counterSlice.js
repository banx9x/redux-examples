import { COUNT_UP, COUNT_DOWN } from "../actions/actions";

const initialState = {
    count: 0,
};

export const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case COUNT_UP: {
            return {
                count: state.count + 1,
            };
        }

        case COUNT_DOWN: {
            return {
                count: state.count - 1,
            };
        }

        default: {
            return state;
        }
    }
};
