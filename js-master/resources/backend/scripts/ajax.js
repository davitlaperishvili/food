$(document).ajaxStart(function() {
	if($hideDefaultLoader != true) {
		$("div.loader").show();
	}
});

$(document).ajaxComplete(function() {
  $("div.loader").hide();
});
