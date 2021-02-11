import {movies} from './movies.js';

export const allMoviesReviews = movies.map((movie) => {
  return {
    movie: `${movie.title}`,
    reviews: [{
      author: `Kate Muir`,
      rating: `8,9`,
      date: `December 24, 2019`,
      content: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
      id: 345234523,
    },
    {
      author: `Bill Goodykoontz`,
      rating: `8,0`,
      date: `November 18, 2015`,
      content: `Anderson's films are too precious for some, but for those of us willing to lose ourselves in them, they're a delight. "The Grand Budapest Hotel" is no different, except that he has added a hint of gravitas to the mix, improving the recipe.`,
      id: 22345234,
    },
    {
      author: `Amanda Greever`,
      rating: `8,0`,
      date: `November 18, 2015`,
      content: `I didn't find it amusing, and while I can appreciate the creativity, it's an hour and 40 minutes I wish I could take back.`,
      id: 4563456345,
    },
    {
      author: `Matthew Lickona`,
      rating: `7,2`,
      date: `December 20, 2016`,
      content: `The mannered, madcap proceedings are often delightful, occasionally silly, and here and there, gruesome and/or heartbreaking.`,
      id: 3456345437,
    },
    {
      author: `Paula Fleri-Soler`,
      rating: `7,6`,
      date: `December 20, 2016`,
      content: `It is certainly a magical and childlike way of storytelling, even if the content is a little more adult.`,
      id: 234513463416,
    },
    {
      author: `Paula Fleri-Soler`,
      rating: `7,0`,
      date: `December 20, 2016`,
      content: `It is certainly a magical and childlike way of storytelling, even if the content is a little more adult.`,
      id: 234623462,
    }]
  };
});
