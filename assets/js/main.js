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




//////////////////////////////////

// (function($) {
//     $(document).ready(function() {
//     var $img = $("#image").imgNotes();
//     $img.one("load",function(){
//     $img.imgNotes("import", [{x:"0.5", y:"0.5", note:"AFL Grand Final Trophy"},
//     {x:"0.322", y:"0.269", note:"Brisbane Lions Flag"},
//     {x:"0.824", y:"0.593", note:"Fluffy microphone"}]);
//     });
//     var $toggle = $("#toggleEdit");
//     if ($img.imgNotes("option","canEdit")) {
//     $toggle.text("View");
//     }else {
//     $toggle.text("Edit");
//     }
//     $toggle.on("click",function() {
//     var $this = $(this);
//     if ($this.text()=="Edit") {
//     $this.text("View");
//     $img.imgNotes("option","canEdit",true);
//     }else {
//     $this.text('Edit');
//     $img.imgNotes('option','canEdit',false);
//     }
//     });
//     });
//     })(jQuery);

