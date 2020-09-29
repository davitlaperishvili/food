"use strict";

// // const numberOfFilms = prompt('how many films you have watched', '');

// // const personalMoviesDB = {
// //     count: numberOfFilms,
// //     movies: {},
// //     actors: {},
// //     genres: [],
// //     privat: false
// // };



// // for( let i = 0; i < 2; i++){
// //     const a = prompt('The last movie you watched', ''),
// //           b = prompt('How much do you like it?', '');

// //     if( a != null && b != null && a != '' && b != '' && a.length < 50 ){
// //         console.log('done')
// //         personalMoviesDB.movies[a] = b;
// //     }else{
// //         i--
// //         console.log('error')
// //     }
// //     if(personalMoviesDB.count < 10){
// //         console.log('<10')
// //     }
// // }

// // console.log(personalMoviesDB);

// function ret (){
//     let num = 50;
//     return num
// }
// console.log(ret())


const options = {
    name: 'object',
    width: 1024,
    height: 1024,
    color: {
        border: 'black',
        bg: 'red'
    }
};
//console.log(`${options[name]}`);
for( let key in options){
    console.log(`Option ${key} have value: ${options[key]} `);
}
