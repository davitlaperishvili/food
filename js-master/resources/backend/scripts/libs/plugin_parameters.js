export const selectori_parameters = (placeholder) => {
	return {
		allowClear: false,
		minimumResultsForSearch: -1,
		placeholder
	}
};

$(document).ready(function(){
	// სელექტორის გაფორმება
	$("select.selectori").each(function(){
		var placeholder = $(this).data('placeholder') || 'Default placeholder';
		$(this).select2(selectori_parameters(placeholder));
	});
	$("select.tags_input").select2({
		tags: true
	});
	// magnific
	$(".magnific a img").each(function () {
		$(this).parent("a").addClass("has-img");
	});
	$(".magnific").each(function(){
		$(this).magnificPopup({
			delegate: "a.has-img",
			type: "image",
			gallery:{
				enabled: false
			},
			zoom:{
				enabled: true,
				duration: 300
			}
		});
	});
	// არტ ფორმა
	$("input.artform").artmediaForm();
	// რამდენიმე ელემენტის მონიშვნა
	$("body").on("click",".selectable > li > figure", function() {
		var parentLi = $(this).parent('li');
		parentLi.toggleClass("ui-selected");
		on_click_close_window(parentLi);
	});
	// სორტი
	$("div.media_manager div.media_manager_right div.folders ul, div.list > ul, div.page_inside div.page_widget div.widget_content.uploaded_files ul, div.dynamic_form_items div.dynamic_form_listing, div.photo_gallery div.widget_content.uploaded_files ul, div.contact_addresses ul").sortable({
		placeholder: "ui-state-highlight"
	});
	$('body').on('click','.featured_image figure a.delete',function() {
		empty_featured_image();
	});
	// მედია მენეჯერში ფაილის მონიშვნისას პოპაპი რო დაიხუროს
	function on_click_close_window(el) {
		var full_src = el.data("fullSrc");
		var id = el.data("id");
	    var var_name = $variable;
	    window.opener.$("input[name='"+var_name+"']").val(full_src);
	    window.opener.$("input[name='"+var_name+"_id']").val(id);
	    window.opener.$("input[name='"+var_name+"']").siblings("a.view").addClass("visible");
	    window.opener.$(".is-crop-ajax").attr('data-src',$storageUrl+full_src);
	    if(var_name == 'featured_image') {
	    	add_featured_image(id,full_src);
	    }
	    if(var_name == 'attach_files') {
	    	attach_files_to_content(id,full_src);
	    }
	    else{
	    	self.close();
	    }
	}
	function add_featured_image(id,full_src)
	{
		var src = $storageUrl+full_src;
		console.log(src);
		window.opener.$("input[name='media_id']").val(id);
		window.opener.$('#featured_image_add_block').css({'display' : 'none'});
		window.opener.$('#featured_image_remove_block img').attr('src',src);
		window.opener.$('#featured_image_remove_block').css({'display' : 'block'});
		self.close();
	}
	function empty_featured_image()
	{
		$("input[name='media_id']").val('');
		$('#featured_image_add_block').css({'display' : 'flex'});
		$('#featured_image_remove_block img').attr('src','');
		$('#featured_image').val('');
		$('#featured_image_remove_block').css({'display' : 'none'});
	}
	function attach_files_to_content(id) {
		var ajax_url = window.opener.$('#attach_files').data('url');
		$.ajax({
			type:'POST',
			url: ajax_url,
			dataType: 'json',
			data: { media_id: id },
			success:function(result){
				if(result.status == 'ok') {
					window.opener.$(".imageList").html(result.imageResponse);
					window.opener.$(".fileList").html(result.fileResponse);
					self.close();
				}
				else{
					console.log(result.message)
					alert(result.message)
				}
			},
			error: function(result){
				alert('error');
				console.log(result);
			}
		});
	}
	// თარიღი/დრო
	var year = (new Date).getFullYear();
	$(".datepicker").datepicker({
		changeMonth: true,
		changeYear: true,
		dateFormat: "dd/mm/yy",
		// maxDate: new Date,
		monthNamesShort: ["იანვარი","თებერვალი","მარტი","აპრილი","მაისი","ივნისი","ივლისი","აგვისტო","სექტემბერი","ოქტომბერი","ნოემბერი","დეკემბერი"],
		firstDay: 1,
		dayNamesMin: ["კვ","ორ","სა","ოთ","ხუ","პა","შა"],
		nextText: 'შემდეგი თვე',
		prevText: 'წინა თვე'
	});
});
