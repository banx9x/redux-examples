function logger(createStore) {
    return function createStoreWrapper(reducer, enhencer) {
        function reducerWrapper(currentState, action) {
            console.log("Dispatch", action.type);
            const newState = reducer(currentState, action);
            return newState;
        }

        const store = createStore(reducerWrapper, enhencer);

        store.hello = () => console.log("Hello Enhencer 🤪");
        return store;
    };
}

export default logger;
