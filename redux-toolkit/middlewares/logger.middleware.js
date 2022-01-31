const logger = (storeAPI) => (next) => (action) => {
    console.log("\n");
    console.log("Dispatched:", action.type);
    action.payload && console.log(action.payload);
    action.error && console.warn(action.error.message);
    console.log("Current state:", storeAPI.getState());
    next(action);
    console.log("After:", storeAPI.getState());
};

export default logger;
