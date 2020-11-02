$(document).ready(function(){
	// Artmedia form (radio / checkbox)
	$("input[type='radio'].artform, input[type='checkbox'].artform").wrap("<div class='artform_wrap'></div>").after("<span></span>");
	// Artmedia form (file upload)
	$("input.artfile").each(function(){
		var $input = $(this), $label = $input.next("label"), labelVal = $label.html();
		$input.on("change", function(e){
			var fileName = "";
			if(this.files && this.files.length > 1){
				fileName = (this.getAttribute("data-multiple-caption") || "").replace("{count}", this.files.length);
			}else if(e.target.value){
				fileName = e.target.value.split("\\").pop();
			}
			if(fileName){
				$label.find("span").html(fileName);
			}else{
				$label.html(labelVal);
			}
		});
		$input.on("focus", function(){
			$input.addClass("has-focus");
		}).on("blur", function(){
			$input.removeClass("has-focus");
		});
	});
});