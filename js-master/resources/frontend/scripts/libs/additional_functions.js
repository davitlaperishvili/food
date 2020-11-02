$(document).ready(function(){
	// inline-block-ში ზედმეტი დაშორების მოცილება
	$(".remove_space").contents().filter(function(){
		return this.nodeType === 3;
	}).remove();
	// გალერეის გაწყვეტა
	$("div.content div.gallery_listing div.col-xs-12:nth-child(2n)").after('<div class="clear"></div>');
	// ელემენტის გარეთ დაკლიკება
	$(document).click(function(e){
		if(!$(e.target).closest(".element").length > 0){
			// Function
		}
	});
	// გაზიარების მოდალი
	$("div.share_button a").click(function(){
		$("div.share_modal").fadeIn(200);
	});
	$("div.share_modal div.close").click(function(){
		$("div.share_modal").fadeOut(200);
	});
	// შეარის პოპაპი
	$("div.share ul li a, div.share_modal ul li a").click(function(e){
		e.preventDefault();
		window.open($(this).attr('href'), 'ShareWindow', 'height=450, width=550, top=' + ($(window).height() / 2 - 275) + ', left=' + ($(window).width() / 2 - 225) + ', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
		return false;
	});
	// ხშირი კითხვები
	$("div.faq ul li div.faq_question a").click(function(){
		var faq_cont = $(this).parent("div.faq_question").next("div.faq_content");
		if(faq_cont.is(":hidden")){
			faq_cont.slideDown(400);
		}else{
			faq_cont.slideUp(400);
		}
	});
	// SVG ზომების ავტომატური მინიჭება
	if($("svg:not(.nosvg)").lengh){
		$("svg:not(.nosvg)").each(function(){
			var krki = this.getBBox();
			var sigane = krki.width;
			var simagle = krki.height;
			$(this).css({
				width: sigane+"px",
				height: simagle+"px"
			});
		});
	}
	// SVG Stroke ანიმაციისთვის
	$("svg.dashed path").each(function(){
		var sigrdze = this.getTotalLength();
		this.style.strokeDasharray = [sigrdze, sigrdze].join(' ');
		this.style.strokeDashoffset = sigrdze;
	});
	// Search trigger
	$("div.search_trigger a").click(function(){
		$("div.modal_search").fadeIn(200);
		$("div.modal_search form input[type='search']").focus();
	});
	$("div.modal_search div.close, div.modal_search div.search_wrap div.search_overlay").click(function(){
		$("div.modal_search").fadeOut(200);
	});
	// Modal
	$(".modal_trigger").click(function(){
		$("div.modal_overlay, div.modal").fadeIn(200);
	});
	$("div.modal div.close, div.modal_overlay").click(function(){
		$("div.modal_overlay, div.modal").fadeOut(200);
	});
});
