import PropTypes from "prop-types";

const CustomPropTypes = {
  MOVIE: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    background: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    description: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    rating: PropTypes.string.isRequired,
    ratingDescription: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    preview: PropTypes.string.isRequired,
    runTime: PropTypes.string.isRequired,
  }).isRequired,

  REVIEW: PropTypes.shape({
    movie: PropTypes.string.isRequired,
    reviews: PropTypes.arrayOf(
        PropTypes.shape({
          author: PropTypes.string.isRequired,
          rating: PropTypes.string.isRequired,
          date: PropTypes.string.isRequired,
          content: PropTypes.string.isRequired,
          id: PropTypes.number.isRequired,
        }).isRequired
    ).isRequired,
  }).isRequired,
};

export default CustomPropTypes;
