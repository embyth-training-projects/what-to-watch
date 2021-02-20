import * as React from "react";
import * as ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

import App from "./components/app/app";

import {createAPI} from "./api";

import reducer from "./store/reducer";
import {Operations as DataOperations} from "./store/data/data";
import {Operations as UserOperation, ActionCreator as UserActionCreator} from "./store/user/user";

import {AuthorizationStatus} from "./helpers/const";

const root = document.querySelector(`#root`);
const onUnauthorized = () => store.dispatch(UserActionCreator.setAuthorizationStatus(AuthorizationStatus.NOT_AUTH));
const api = createAPI(onUnauthorized);

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

store.dispatch(DataOperations.loadMoviePromo());
store.dispatch(DataOperations.loadMovies());
store.dispatch(UserOperation.checkAuth());

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    root
);
