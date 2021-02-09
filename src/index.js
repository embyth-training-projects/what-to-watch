import React from "react";
import ReactDOM from "react-dom";

import App from "./components/app/app";

import {movies, promoMovie} from "./mock/movies";

ReactDOM.render(
    <App promoMovie={promoMovie} movieCards={movies} />,
    document.querySelector(`#root`)
);
