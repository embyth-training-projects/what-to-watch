import React from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {reducer} from "./reducer/reducer";

import {App} from "./components/app/app";

import {movies} from "./mock/movies";
import {allMoviesReviews} from "./mock/reviews";

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
);

ReactDOM.render(
    <Provider store={store}>
      <App
        currentMovie={movies[0]}
        movies={movies}
        moviesReviews={allMoviesReviews}
      />
    </Provider>,
    document.querySelector(`#root`)
);
