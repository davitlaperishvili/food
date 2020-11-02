"use strict";

import 'select2';
import 'slick-carousel';
import 'magnific-popup';

import './libs/hamburger_menu.js';
import './libs/artmedia_functions.js';
import './libs/additional_functions.js';
import './libs/plugin_parameters.js';
//import './libs/tree_menu.js';

import $ from 'jquery';
window.jQuery = $;
window.$ = $;

$(document).ready(function(){
	// ...
});





 document.addEventListener('DOMContentLoaded', () => {

// //     const movieDB = {
// //         movies: [
// //             "Логан",
// //             "Лига справедливости",
// //             "Ла-ла лэнд",
// //             "Одержимость",
// //             "Скотт Пилигрим против..."
// //         ]
// //     };

// //     const adv = document.querySelectorAll('.promo__adv img'),
// //         poster = document.querySelector('.promo__bg'),
// //         genre = poster.querySelector('.promo__genre'),
// //         movieList = document.querySelector('.promo__interactive-list'),
// //         addForm = document.querySelector('form.add'),
// //         addInput = addForm.querySelector('.adding__input'),
// //         checkbox = addForm.querySelector('[type="checkbox"]');

// //     addForm.addEventListener('submit', (event) => {
// //         event.preventDefault();

// //         let newFilm = addInput.value;
// //         const favorite = checkbox.checked;

// //         if (newFilm) {

// //             if (newFilm.length > 21) {
// //                 newFilm = `${newFilm.substring(0, 22)}...`;
// //             }

// //             if (favorite) {
// //                 console.log("Добавляем любимый фильм");
// //             }

// //             movieDB.movies.push(newFilm);
// //             sortArr(movieDB.movies);
    
// //             createMovieList(movieDB.movies, movieList);
// //         }

// //         event.target.reset();

// //     });

// //     const deleteAdv = (arr) => {
// //         arr.forEach(item => {
// //             item.remove();
// //         });
// //     };

// //     const makeChanges = () => {
// //         genre.textContent = 'драма';

// //         poster.style.backgroundImage = 'url("img/bg.jpg")';
// //     };

// //     const sortArr = (arr) => {
// //         arr.sort();
// //     };

// //     function createMovieList(films, parent) {
// //         parent.innerHTML = "";
// //         sortArr(films);
    
// //         films.forEach((film, i) => {
// //             parent.innerHTML += `
// //                 <li class="promo__interactive-item">${i + 1} ${film}
// //                     <div class="delete"></div>
// //                 </li>
// //             `;
// //         });

// //         document.querySelectorAll('.delete').forEach((btn, i) => {
// //             btn.addEventListener('click', () => {
// //                 btn.parentElement.remove();
// //                 movieDB.movies.splice(i, 1);

// //                 createMovieList(films, parent);
// //             });
// //         });
// //     }

// //     deleteAdv(adv);
// //     makeChanges();
// //     createMovieList(movieDB.movies, movieList);

// // });





// // Timer Make function 


const deadline = '2020-12-31';

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

// /////////// place element in cyrcle

// // var theta = [];

// // var setup = function (n, rx, ry, id) {
// //     var main = document.getElementById(id);
// //     var mainHeight = parseInt(window.getComputedStyle(main).height.slice(0, -2));
// //     var circleArray = [];
// //     var colors = ['red', 'green', 'purple', 'black', 'orange', 'yellow', 'maroon', 'grey', 'lightblue', 'tomato', 'pink', 'maroon', 'cyan', 'magenta', 'blue', 'chocolate', 'darkslateblue', 'coral', 'blueviolet', 'burlywood', 'cornflowerblue', 'crimson', 'darkgoldenrod', 'olive', 'sienna', 'red', 'green', 'purple', 'black', 'orange', 'yellow', 'maroon', 'grey', 'lightblue', 'tomato', 'pink', 'maroon', 'cyan', 'magenta', 'blue', 'chocolate', 'darkslateblue', 'coral', 'blueviolet', 'burlywood', 'cornflowerblue', 'crimson', 'darkgoldenrod', 'olive', 'sienna'];
// //     for (var i = 0; i < n; i++) {
// //         var circle = document.createElement('div');
// //         circle.className = 'circle number' + i;
// //         circleArray.push(circle);
// //         circleArray[i].posx = Math.round(rx * (Math.cos(theta[i]))) + 'px';
// //         circleArray[i].posy = Math.round(ry * (Math.sin(theta[i]))) + 'px';
// //         circleArray[i].style.position = "absolute";
// //         circleArray[i].style.backgroundColor = colors[i];
// //         circleArray[i].style.top = ((mainHeight / 2) - parseInt(circleArray[i].posy.slice(0, -2))) + 'px';
// //         circleArray[i].style.left = ((mainHeight / 2) + parseInt(circleArray[i].posx.slice(0, -2))) + 'px';
// //         main.appendChild(circleArray[i]);
// //     }
// // };

// // var generate = function (n, rx, ry, id) {
// //     var frags = 360 / n;
// //     for (var i = 0; i <= n; i++) {
// //         theta.push((frags / 180) * i * Math.PI);
// //     }
// //     setup(n, rx, ry, id)
// // }
// // generate(16, 150, 150, 'main');


// //////////// CLASSES

// class Rectangle {
//     constructor (width, height){
//         this.width = width;
//         this.height = height;
//     }
//     calcArea(){
//         return this.width * this.height;
//     }
// }

// const div = new Rectangle(10, 10)
// console.log(div.calcArea())

// class ColoredRectangleWithText extends Rectangle {
//     constructor (height, width, color, text){
//         super(height, width)
//         this.text = text;
//         this.color = color;

//     }
//     showMyProps(){
//         const sum = this.calcArea()
//         return `sum: ${sum}. text: ${this.text}, color: ${this.color}`
//     }
// }

// const div1 = new ColoredRectangleWithText(15, 20, 'red', 'Hello, World');
// console.log(div1.showMyProps())


////// Real Classes

class MenuCard{
    constructor(src, alt, title, desc, price, parentElement) {
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.desc = desc;
        this.price = price;
        this.parent = document.querySelector(parentElement)
        this.transfer = 27;
        this.changeToUAH();
    }
    changeToUAH() {
        this.price = this.price * this.transfer;
    }
    render(){
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="menu__item">
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.desc}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            </div>
        `;
        this.parent.append(element);

    }
}

new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    7,
    '.menu .container'
).render()

new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    20,
    '.menu .container'
).render()

new MenuCard(
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    30,
    '.menu .container'
).render()


 });