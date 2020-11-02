$(document).ready(function(){
	// არტ ფორმა (radio / checkbox)
	$.fn.artmediaForm = function(){
		$("input[type='radio'].artform").wrap("<div class='artform_wrap artradio'></div>");
		$("input[type='checkbox'].artform").wrap("<div class='artform_wrap artchecker'></div>");
		$("div.artradio").each(function(){
			if($(this).find("input").is(":checked")){
				$(this).addClass("checked");
			}
			if($(this).find("input").is(":disabled")){
				$(this).addClass("disabled");
			}else{
				$(this).removeClass("disabled");
			}
			$(this).click(function(){
				if($(this).find("input").is(":disabled")){}
				else{
					$(this).find("input").prop("checked", true);
					var saxeli = $(this).find("input").attr("name");
				}
				$("div.artradio").has("input[name="+saxeli+"]").removeClass("checked");
				if($(this).find("input[name="+saxeli+"]").is(':checked')){
					$(this).addClass("checked");
				}
			});
		});
		$("div.artchecker").each(function(){
			if($(this).find("input").is(":checked")){
				$(this).addClass("checked");
			}
			if($(this).find("input").is(":disabled")){
				$(this).addClass("disabled");
			}else{
				$(this).removeClass("disabled");
			}
			$(this).click(function() {
				$(this).find("input").click();
				var isChecked = $(this).find("input:checked").length > 0;
				if(isChecked){
					$(this).addClass("checked");
				}else{
					$(this).removeClass("checked");
				}
			});
		});
		$("input.artform").click(function(){
			$(this).parent("div.artchecker").click();
		});
	}
	$.fn.artmediaFormDisabled = function(){
		$("div.artradio, div.artchecker").each(function(){
			if($(this).find("input").is(":disabled")){
				$(this).addClass("disabled");
			}else{
				$(this).removeClass("disabled");
			}
		});
	}
	// არტ ფორმა (ფაილის ატვირთვა)
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