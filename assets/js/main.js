"use strict";

const numberOfFilms = prompt('how many films you have watched', '');

const personalMoviesDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    genres: [],
    privat: false
};

const a = prompt('The last movie you watched', ''),
      b = prompt('How much do you like it?', ''),
      c = prompt('The last movie you watched', ''),
      d = prompt('The last movie you watched', '');

personalMoviesDB.movies[a] = b;
personalMoviesDB.movies[c] = d;

console.log(personalMoviesDB);

