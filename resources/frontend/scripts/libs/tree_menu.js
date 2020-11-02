$(document).ready(function(){
	// ჩაშლილი მენიუს და მისი ზე მენიუების ავტომატური მონიშვნა
	$("nav.tree_menu > ul > li ul li.active").parents("li").addClass("active");
	// ჩაშლილი მენიუ
	$("nav.tree_menu > ul li").has("ul").addClass("hasul");
	$("nav.tree_menu > ul li.hasul").append('<span class="tree_indicator tree_plus"></span>');
	$("nav.tree_menu > ul li.hasul").find("> a").attr("href", "javascript:void(0);");
	$("nav.tree_menu > ul li.hasul").each(function(){
		if($(this).find(">ul").is(":visible")){
			$(this).removeClass("closed").addClass("opened");
			$(this).find("span.tree_plus").removeClass("tree_plus").addClass("tree_minus");
		}else{
			$(this).removeClass("opened").addClass("closed");
			$(this).find("span.tree_minus").removeClass("tree_minus").addClass("tree_plus");
		}
	});
	$("nav.tree_menu > ul li.hasul > span.tree_indicator").click(function(){
		if($(this).siblings("ul").is(":visible")){
			$(this).parents("li").removeClass("opened").addClass("closed");
			$(this).removeClass("tree_minus").addClass("tree_plus");
			$(this).siblings("ul").stop().animate({
				height: "toggle"
			});
		}else{
			$(this).parents("li").removeClass("closed").addClass("opened");
			$(this).addClass("tree_minus").removeClass("tree_plus");
			$(this).siblings("ul").stop().animate({
				height: "toggle"
			});
		}
	});
	$("nav.tree_menu > ul li.hasul > a").click(function(){
		if($(this).siblings("ul").is(":visible")){
			$(this).parents("li").removeClass("opened").addClass("closed");
			$(this).siblings("span").removeClass("tree_minus").addClass("tree_plus");
			$(this).siblings("ul").stop().animate({
				height: "toggle"
			});
		}else{
			$(this).parents("li").removeClass("closed").addClass("opened");
			$(this).siblings("span").addClass("tree_minus").removeClass("tree_plus");
			$(this).siblings("ul").stop().animate({
				height: "toggle"
			});
		}
	});
});
