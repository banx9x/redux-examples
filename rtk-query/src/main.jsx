import React from "react";
import { render } from "react-dom";
import "./mookup/db";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";

render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
