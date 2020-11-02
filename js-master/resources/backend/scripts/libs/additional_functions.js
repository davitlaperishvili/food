$(document).ready(function(){
	// ელემენტის გარეთ დაკლიკება
	$(document).click(function(e){
		if(!$(e.target).closest(".element").length > 0){
			// Function
		}
	});
	$(".highlight_this").click(function(){
		$(this).select();
		var doc = document
		, text = this
		, range, selection;
		if(doc.body.createTextRange){
			range = document.body.createTextRange();
			range.moveToElementText(text);
			range.select();
		}else if(window.getSelection){
			selection = window.getSelection();
			range = document.createRange();
			range.selectNodeContents(text);
			selection.removeAllRanges();
			selection.addRange(range);
		}
	});
});
