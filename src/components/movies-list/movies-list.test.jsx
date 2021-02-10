import React from "react";
import renderer from "react-test-renderer";

import MoviesList from "./movies-list";

const movies = [
  {
    title: `Fantastic Beasts: The Crimes of Grindelwald`,
    genre: `Kids & Family`,
    date: `2018`,
    background: `https://placeimg.com/1300/512/nature`,
    poster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    id: 189234,
    description: [`The second installment of the "Fantastic Beasts" series featuring the adventures of Magizoologist Newt Scamander.`],
    rating: `6,6`,
    ratingDescription: `Normal`,
    votes: 500,
    director: `David Yates`,
    starring: [`Johnny Depp`, `Eddie Redmayne`, `Katherine Waterston`, `Dan Fogler`],
    preview: `https://upload.wikimedia.org/wikipedia/commons/a/a8/Solis_Viaduct%2C_Schinschlucht_and_Solis_dam%2C_aerial_video.webm`,
  },
  {
    title: `Bohemian Rhapsody`,
    genre: `Documentary`,
    date: `2018`,
    background: `https://placeimg.com/1300/512/nature`,
    poster: `img/bohemian-rhapsody.jpg`,
    id: 178345,
    description: [`The story of the legendary British rock band Queen and lead singer Freddie Mercury, leading up to their famous performance at Live Aid (1985).`],
    rating: `8,0`,
    ratingDescription: `Good`,
    votes: 800,
    director: `Bryan Singer`,
    starring: [`Rami Malek`, `Lucy Boynton`, `Gwilym Lee`],
    preview: `https://upload.wikimedia.org/wikipedia/commons/3/35/Snoqualmie_Depot_-_Historic_Place_in_King_County%2C_Washington.webm`,
  },
  {
    title: `Aviator`,
    genre: `Drama`,
    date: `2004`,
    background: `https://placeimg.com/1300/512/nature`,
    poster: `img/aviator.jpg`,
    id: 167456,
    description: [`A biopic depicting the early years of legendary Director and aviator Howard Hughes' career from the late 1920s to the mid 1940s.`],
    rating: `7,5`,
    ratingDescription: `Normal`,
    votes: 1650,
    director: `Martin Scorsese`,
    starring: [`Leonardo DiCaprio`, `Cate Blanchett`, `Kate Beckinsale`],
    preview: `https://upload.wikimedia.org/wikipedia/commons/9/9b/St._Lambertus_%28Immerather_Dom%29_2016.webm`,
  },
  {
    title: `Shutter Island`,
    genre: `Thriller`,
    date: `2010`,
    background: `https://placeimg.com/1300/512/nature`,
    poster: `img/shutter-island.jpg`,
    id: 156567,
    description: [`In 1954, a U.S. Marshal investigates the disappearance of a murderer who escaped from a hospital for the criminally insane.`],
    rating: `8,1`,
    ratingDescription: `Good`,
    votes: 900,
    director: `Martin Scorsese`,
    starring: [`Leonardo DiCaprio`, `Emily Mortimer`, `Mark Ruffalo`],
    preview: `https://upload.wikimedia.org/wikipedia/commons/4/4d/Baha%27i_Temple_--_Wilmette_%2C_IL_--_Drone_Video_%28DJI_Spark%29.webm`,
  },
];

it(`Should render correctly movies list`, () => {
  const tree = renderer
    .create(<MoviesList
      movies={movies}
      onMovieCardClick={() => {}}
    />, {
      createNodeMock: () => {
        return {};
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
