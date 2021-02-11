import React from "react";
import ReactDOM from "react-dom";

import App from "./components/app/app";

import {movies} from "./mock/movies";
import {allMoviesReviews} from "./mock/reviews";

ReactDOM.render(
    <App
      promoMovie={movies[0]}
      movieCards={movies}
      moviesReviews={allMoviesReviews}
    />,
    document.querySelector(`#root`)
);
