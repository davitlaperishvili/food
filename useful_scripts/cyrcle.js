// /////////// place element in cyrcle
"use strict";

var theta = [];

var setup = function (n, rx, ry, id) {
    var main = document.getElementById(id);
    var mainHeight = parseInt(window.getComputedStyle(main).height.slice(0, -2));
    var circleArray = [];
    var colors = ['red', 'green', 'purple', 'black', 'orange', 'yellow', 'maroon', 'grey', 'lightblue', 'tomato', 'pink', 'maroon', 'cyan', 'magenta', 'blue', 'chocolate', 'darkslateblue', 'coral', 'blueviolet', 'burlywood', 'cornflowerblue', 'crimson', 'darkgoldenrod', 'olive', 'sienna', 'red', 'green', 'purple', 'black', 'orange', 'yellow', 'maroon', 'grey', 'lightblue', 'tomato', 'pink', 'maroon', 'cyan', 'magenta', 'blue', 'chocolate', 'darkslateblue', 'coral', 'blueviolet', 'burlywood', 'cornflowerblue', 'crimson', 'darkgoldenrod', 'olive', 'sienna'];
    for (var i = 0; i < n; i++) {
        var circle = document.createElement('div');
        circle.className = 'circle number' + i;
        circleArray.push(circle);
        circleArray[i].posx = Math.round(rx * (Math.cos(theta[i]))) + 'px';
        circleArray[i].posy = Math.round(ry * (Math.sin(theta[i]))) + 'px';
        circleArray[i].style.position = "absolute";
        circleArray[i].style.backgroundColor = colors[i];
        circleArray[i].style.top = ((mainHeight / 2) - parseInt(circleArray[i].posy.slice(0, -2))) + 'px';
        circleArray[i].style.left = ((mainHeight / 2) + parseInt(circleArray[i].posx.slice(0, -2))) + 'px';
        main.appendChild(circleArray[i]);
    }
};

var generate = function (n, rx, ry, id) {
    var frags = 360 / n;
    for (var i = 0; i <= n; i++) {
        theta.push((frags / 180) * i * Math.PI);
    }
    setup(n, rx, ry, id)
}
generate(16, 150, 150, 'main');


// Base html 

// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Food</title>
//     <link rel="stylesheet" href="css/style.css">
// </head>
// <body>
//     <div id="main"></div>

//     <script src="assets/js/main.js"></script>
// </body>
// </html>