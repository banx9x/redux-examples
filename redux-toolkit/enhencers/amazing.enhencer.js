const amazing = (createStore) => (reducer, enhencer) => {
    const store = createStore(reducer, enhencer);

    store.hello = () => console.log("Hello Enhencer 😆");
    store.goodbye = () => console.log("Goodbye Enhencer 🤪");

    return store;
};

export default amazing;
