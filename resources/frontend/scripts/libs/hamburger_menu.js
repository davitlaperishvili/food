$(document).ready(function(){
	// Sub menu positioning based on viewport width
	$(window).bind("load resize", function(e){
		$("nav.navigation > ul > li ul").each(function(e){
			var $this = $(this);
			var $panjara = $(window).width();
			var $sigane = $this.outerWidth();
			var $mdebareoba = $this.offset();
			var $mdebareoba_left = $mdebareoba.left;
			var $jamshi = $sigane + $mdebareoba_left;
			if($jamshi > $panjara){
				$this.addClass("rtl");
			}else{
				$this.removeClass("rtl");
			}
		});
	});
	// Automatic select of horizontal menu of active items
	$("nav.navigation > ul > li ul li.active").parents("li").addClass("active");
	// Clone to responsive menu
	var clone = $("nav.navigation > ul").clone();
	$("div.resp_menu div.resp_menu_ul").html(clone);
	// Responsive menu
	$("div.resp_menu > div.resp_menu_toggle").click(function(){
		var resp_menu = $(this).next("div.resp_menu_ul");
		if(resp_menu.is(":hidden")){
			$(this).addClass("resp_menu_toggled");
			resp_menu.fadeIn(500);
		}else{
			$(this).removeClass("resp_menu_toggled");
			resp_menu.fadeOut(500);
		}
	});
	$("div.resp_menu ul li").has("ul").append('<div class="plus_minus"><div class="plus"></div><div class="minus"></div></div>');
	$("div.resp_menu ul li div.plus_minus").click(function(){
		var resp_sub_menu = $(this).prev("ul");
		if(resp_sub_menu.is(":hidden")){
			$(this).addClass("plus_minus_toggled");
			resp_sub_menu.slideDown(400);
		}else{
			$(this).removeClass("plus_minus_toggled");
			resp_sub_menu.slideUp(400);
		}
	});
});