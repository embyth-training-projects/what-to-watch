import React from "react";
import ReactDOM from "react-dom";

import App from "./components/app/app";

const movieCard = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  releaseDate: 2014,
};

ReactDOM.render(
    <App movieCard={movieCard} />,
    document.querySelector(`#root`)
);
