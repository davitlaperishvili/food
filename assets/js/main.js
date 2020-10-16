 "use strict";



// document.addEventListener('DOMContentLoaded', () => {

//     const movieDB = {
//         movies: [
//             "Логан",
//             "Лига справедливости",
//             "Ла-ла лэнд",
//             "Одержимость",
//             "Скотт Пилигрим против..."
//         ]
//     };

//     const adv = document.querySelectorAll('.promo__adv img'),
//         poster = document.querySelector('.promo__bg'),
//         genre = poster.querySelector('.promo__genre'),
//         movieList = document.querySelector('.promo__interactive-list'),
//         addForm = document.querySelector('form.add'),
//         addInput = addForm.querySelector('.adding__input'),
//         checkbox = addForm.querySelector('[type="checkbox"]');

//     addForm.addEventListener('submit', (event) => {
//         event.preventDefault();

//         let newFilm = addInput.value;
//         const favorite = checkbox.checked;

//         if (newFilm) {

//             if (newFilm.length > 21) {
//                 newFilm = `${newFilm.substring(0, 22)}...`;
//             }

//             if (favorite) {
//                 console.log("Добавляем любимый фильм");
//             }

//             movieDB.movies.push(newFilm);
//             sortArr(movieDB.movies);
    
//             createMovieList(movieDB.movies, movieList);
//         }

//         event.target.reset();

//     });

//     const deleteAdv = (arr) => {
//         arr.forEach(item => {
//             item.remove();
//         });
//     };

//     const makeChanges = () => {
//         genre.textContent = 'драма';

//         poster.style.backgroundImage = 'url("img/bg.jpg")';
//     };

//     const sortArr = (arr) => {
//         arr.sort();
//     };

//     function createMovieList(films, parent) {
//         parent.innerHTML = "";
//         sortArr(films);
    
//         films.forEach((film, i) => {
//             parent.innerHTML += `
//                 <li class="promo__interactive-item">${i + 1} ${film}
//                     <div class="delete"></div>
//                 </li>
//             `;
//         });

//         document.querySelectorAll('.delete').forEach((btn, i) => {
//             btn.addEventListener('click', () => {
//                 btn.parentElement.remove();
//                 movieDB.movies.splice(i, 1);

//                 createMovieList(films, parent);
//             });
//         });
//     }

//     deleteAdv(adv);
//     makeChanges();
//     createMovieList(movieDB.movies, movieList);

// });


// function makeCyrcleByElements(itemSize = '6em'){
//     const container = document.querySelector('.circle-container'),
//           items = container.querySelectorAll('.circle-item');

//     let circleSize = (items.length * 64) + 'px',
//         itemCount = items.length,
//         angle = (360 / itemCount),
//         rot = 0;

//     container.style.cssText = `
//         position: relative;
//         width:  ${circleSize};
//         height: ${circleSize};
//         padding: 0;
//         border-radius: 50%; 
//         list-style: none;
//     `;
//     items.forEach(function(item, i){
//         item.style.cssText = `
//             display: block;
//             position: absolute;
//             top:  50%; 
//             left: 50%;
//             width:  ${itemSize};
//             height: ${itemSize};
//             margin: -(${itemSize} / 2);
//             transform: 
//             rotate(calc(${rot} * 1deg)) 
//             translate(calc(${circleSize} / 2)) 
//             rotate(calc(${rot} * -1deg));
//         `;
//         rot = rot + angle;
//     });
// };

// makeCyrcleByElements('100px');



// const now = new Date(1602835054435);
// console.log(now.getTime())
// console.log(now)
// console.log(now.getTimezoneOffset())

const deadline = '2020-10-20';

function getTimeRemaining(endtime){
    const t = Date.parse(endtime) - Date.parse(new Date());
    const days = Math.floor( t / (1000 * 60 * 60 * 24));
    const hours = Math.floor( t / (1000 * 60 * 60) % 24);
    const minutes = Math.floor( t / 1000 / 60 % 60);
    const seconds = Math.floor( (t / 1000) % 60);

    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}
function getZero(num) {
    if( num >= 0 && num < 10){
        return `0${num}`;
    }else{
        return num;
    }
}
function setClock( selector, endtime){
    const timer = document.querySelector(selector);
    const days = timer.querySelector('#days');
    const hours = timer.querySelector('#hours');
    const minutes = timer.querySelector('#minutes');
    const seconds = timer.querySelector('#seconds');
    const interval = setInterval( updateClock, 1000);

    updateClock();

    function updateClock(){
        const t = getTimeRemaining(endtime);
        days.innerHTML = getZero(t.days);
        hours.innerHTML = getZero(t.hours);
        minutes.innerHTML = getZero(t.minutes);
        seconds.innerHTML = getZero(t.seconds);
        
        if(t.total <= 0){
            clearInterval(interval)
        }
    }
}

setClock('.timer', deadline );

