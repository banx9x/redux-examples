function middleware({ dispatch, getState }) {
    return function dispatchWrapper(next) {
        return function actionWrapper(action) {
            if (typeof action === "function") return action(dispatch);
            else next(action);
        };
    };
}

export default middleware;
