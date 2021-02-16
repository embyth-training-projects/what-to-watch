import PropTypes from "prop-types";

export const CustomPropTypes = {
  MOVIE: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    date: PropTypes.number.isRequired,
    background: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    votes: PropTypes.number.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    preview: PropTypes.string.isRequired,
    runTime: PropTypes.number.isRequired,
    videoLink: PropTypes.string.isRequired,
  }).isRequired,

  REVIEW: PropTypes.shape({
    movie: PropTypes.string.isRequired,
    reviews: PropTypes.arrayOf(
        PropTypes.shape({
          author: PropTypes.string.isRequired,
          rating: PropTypes.number.isRequired,
          date: PropTypes.string.isRequired,
          content: PropTypes.string.isRequired,
          id: PropTypes.number.isRequired,
        }).isRequired
    ).isRequired,
  }).isRequired,
};
