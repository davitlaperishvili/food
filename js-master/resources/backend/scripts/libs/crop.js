import 'guillotine';

$(document).ready(function(){
	// window.cropImg = $('#crop-img').croppie();
	window.cropImg = new Croppie(document.getElementById('crop-img'));

	window.cropImg = $('#thepicture');  // Must be already loaded or cached!
	picture.guillotine({width: 400, height: 300});
});
