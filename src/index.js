import React from "react";
import ReactDOM from "react-dom";

import App from "./components/app/app";

import {movies} from "./mock/movies";

ReactDOM.render(
    <App promoMovie={movies[0]} movieCards={movies} />,
    document.querySelector(`#root`)
);
