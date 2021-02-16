import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

import App from "./components/app/app";

import {createAPI} from "./api";

import reducer from "./store/reducer";
import {Operations as DataOperations} from "./store/data/data";

const root = document.querySelector(`#root`);
const api = createAPI();

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

store.dispatch(DataOperations.loadMoviePromo());
store.dispatch(DataOperations.loadMovies());

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    root
);
