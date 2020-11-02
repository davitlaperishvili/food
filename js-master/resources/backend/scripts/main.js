import 'select2';
import 'simplebar';
import 'jquery-ui';
import 'jquery-ui/ui/widgets/draggable';
import 'jquery-ui/ui/widgets/sortable';
import 'jquery-ui/ui/widgets/datepicker.js';
import 'fullcalendar';
import 'magnific-popup';
import Cropper from 'cropperjs';

import './libs/tree_menu.js';
import './libs/artmedia_functions.js';
import './libs/additional_functions.js';
import './libs/plugin_parameters.js';
import './libs/touch_punch.js';
import './libs/tags.js';
// import './libs/crop.js';
import './ajax.js';
import { selectori_parameters } from './libs/plugin_parameters.js';
import { edit_file_form, delete_prompt, pages_listing, crop_img } from './libs/modal_contents.js';

import $ from 'jquery';
window.jQuery = $;
window.$ = $;

$(document).ready(function(){
	// საიდბარის გამოშლა
	$("div.sidebar_toggle a").click(function(){
		var asidi = $("aside").offset();
		if(asidi.left < 0){
			$(this).addClass("clicked");
			$("aside").addClass("toggled");
		}else{
			$(this).removeClass("clicked");
			$("aside").removeClass("toggled");
		}
	});
	$(window).resize(function(){
		var sigane = $(this).width();
		if(sigane <= 1200){
			$("div.sidebar_toggle a").removeClass("clicked");
			$("aside").removeClass("toggled");
		}else{
			$("div.sidebar_toggle a").addClass("clicked");
			$("aside").addClass("toggled");
		}
	});
	// ტაიტლის იკონის კლონირება
	var clone = $("aside nav.tree_menu > ul > li.active > a svg").clone();
	$("header h1.title figure").html(clone);
	// რესპონსივ ძიების ჩამოშლა
	$("section.top_tools div.top_button_search div.search_toggle a").click(function(){
		if($("section.top_tools div.top_button_search div.search").is(":hidden")){
			$("section.top_tools div.top_button_search div.search_toggle a").addClass("toggled");
			$("section.top_tools div.top_button_search div.search").slideDown(500);
		}else{
			$("section.top_tools div.top_button_search div.search_toggle a").removeClass("toggled");
			$("section.top_tools div.top_button_search div.search").slideUp(500);
		}
	});
	// ფაილის ატვირთვა drop-ით
	function fileUpload() {
		var $form = $('.form_upload');
		var $input = $form.find('input.file-input');
		var droppedFiles = false;
		$form.on('drag dragstart dragend dragover dragenter dragleave drop', function(e) {
			e.preventDefault();
			e.stopPropagation();
		})
		.on('dragover dragenter', function() {
			$form.addClass('is-dragover');
		})
		.on('dragleave dragend drop', function() {
			$form.removeClass('is-dragover');
		})
		.on('drop', function(e) {
			droppedFiles = e.originalEvent.dataTransfer.files;
			var ajax_target = $(this).data('url');
			var ajaxData = new FormData($('#uploadForm')[0]);

			$.each(droppedFiles, function(i, file) {
				ajaxData.append("file[]", file);
			});
			//ajax
			uploadFiles(ajaxData,ajax_target);
		});

		/* ფაილის ატვირთვა ღილაკზე დაჭერით */
		$('body').on('change','.form_upload', function() {
			var field_name = $("input[name='file[]']");
			var files = field_name.prop("files");
			var ajax_target = field_name.data('url');
			var data = new FormData($('#uploadForm')[0]);
			var filter_varaibles = get_filter_variables();
			data.append('folder_id',filter_varaibles.folder_id);
			//ტუ გახსნა სელექტის ფანჯარა და მერე დააქენსელა
			if(files.length == 0){return false;}
			//ajax
			uploadFiles(data,ajax_target);
		});
	}
	fileUpload();
	/* ფაილის ატვირთვა */
	function uploadFiles(data,ajax_target) {
		/* როცა ფაილები იტვირთება სტანდარტული ლოადერი იმალება */
		$hideDefaultLoader = true;
		$.ajax({
			type:'POST',
			url: ajax_target,
			data:data,
			cache:false,
			contentType: false,
			processData: false,
			xhr: function() {  // custom xhr
				var myXhr = jQuery.ajaxSettings.xhr();
				if(myXhr.upload){ // check if upload property exists
					myXhr.upload.addEventListener('progress',progressHandlingFunction, false);
				}
				return myXhr;
			},
			dataType: 'json',
			success:function(result){
				if(result.status == 'ok') {
					$("#uploaded_files_container ul").html(result.response);
					$(".pagination ul").html(result.pager);
				}
				else{
					var message = replaceNewLines(result.message);
					alert(message)
				}
			},
			error: function(result){
				console.log(result);
				$hideDefaultLoader = false;
			},
			complete: function(){
				$hideDefaultLoader = false;
				setTimeout(function() {
					$('.upload_progress').css({
						'opacity': '0'
					});
				}, 100);
				setTimeout(function() {
					$('.upload_progress').css('width', '0');

				}, 1000);
			}
		});
	}
	// პროგრესბარი
	function progressHandlingFunction(e){
		if(e.lengthComputable){
			//$('progress').attr({value:e.loaded,max:e.total});
			var percent = percentCounter(e.loaded,e.total);
			console.log(percent)
			$('.upload_progress').css({
				'opacity': '1',
				'width': percent+'%'
			});
		}
	}
	function percentCounter(loaded,total){
		return (loaded / total) *  100;
	}
	function ajax(ajax_url,load_in,data,method,data_type){
		if(typeof data_type === 'undefined') {
			data_type = 'json';
		}
		if(typeof method === 'undefined') {
			method = 'POST';
		}
		$.ajax({
			type: method,
			url: ajax_url,
			dataType: data_type,
			data: data,
		})
		.done(function(data) {
			if(data.status == 'ok')
			{
				$(load_in).html(data.response);
			}
			else{
				alert(data.message);
			}
			$("input.artform").artmediaForm();
		});
		return false;
	}
	function replaceNewLines(text){
		return text.replace(/\\n/g,"\n");
	}

	function updateFile(data,ajax_target){
		$.ajax({
			type:'POST',
			url: ajax_target,
			data:data,
			cache:false,
			contentType: false,
			processData: false,
			dataType: 'json',
			success:function(result){
				if(result.status == 'ok') {
					$("div.uploaded_files ul").html(result.response);
				}
				else{
					alert(result.message)
				}
			},
			error: function(result){
				alert('error');
				console.log(result);
			},
		});
	}
	/* ფოლტრი მოდულებში */
	$('body').on('change','.filter',function (e) {
		if($(this).hasClass("refreshable")) {
			var filter_id = $(this).val();
			var url = $(this).data('url');
			var index = $(this).data('index');
			location.href=url+'/?filter['+index+']='+filter_id;
		}
	});
	/* ძიება მედია მენეჯერში */
	$('body').on('click','#search_button',function (e) {
		e.preventDefault();
		var ajax_url = $(this).data('url');
		var search = $("#search").val();
		$.ajax({
			type:'POST',
			url: ajax_url,
			dataType: 'json',
			data: get_filter_variables(),
			success:function(result){
				if(result.status == 'ok') {
					$("#uploaded_files_container ul").html(result.response);
					$(".pagination ul").html(result.pager);
					//reset_filter_fields();
				}
				else{
					alert(result.message);
				}
			},
			error: function(result){
				alert('error');
				console.log(result);
			}
		});
	});
	/* ფილტრები მედია მენეჯერში */
	$('body').on('change','#file_type,#archive',function (e) {
		e.preventDefault();
		var ajax_url = $('#file_type').data('url');
		$.ajax({
			type:'POST',
			url: ajax_url,
			dataType: 'json',
			data: get_filter_variables(),
			success:function(result){
				if(result.status == 'ok') {
					$("#uploaded_files_container ul").html(result.response);
					$(".pagination ul").html(result.pager);
				}
				else{
					alert(result.message);
				}
			},
			error: function(result){
				alert('error');
				console.log(result);
			}
		});

	});

	function get_filter_variables()
	{
		var archive = $('#archive :selected').val();
		var file_type = $('#file_type :selected').val();
		var folder_id = $('.folders ul').find('li.active a.folder_link').data('id');
		var search = $('#search').val();

		if(typeof search === 'undefined') {
			search = '';
		}
		if(typeof archive === 'undefined' || archive.length <= 1) {
			archive = '';
		}
		if(typeof file_type === 'undefined' || file_type.length <= 1) {
			file_type = '';
		}
		if(typeof folder_id === 'undefined') {
			folder_id = '';
		}
		return {
			file_type: file_type,
			archive: archive,
			folder_id: folder_id,
			search: search,
		};
	}

	function reset_filter_fields()
	{
		var archive = $('#archive').select2("val", " ");
		var file_type = $('#file_type').select2("val", " ");
	}

	/* პეიჯერი */
	$('body').on('click','.ajax_pagination ul li a', function (e) {
		e.preventDefault();
		var ajax_url = $(this).attr('href');
		$.ajax({
			type:'POST',
			url: ajax_url,
			dataType: 'json',
			data: get_filter_variables(),
			success:function(result){
				if(result.status == 'ok') {
					$("#uploaded_files_container ul").html(result.response);
					$(".pagination ul").html(result.pager);
				}
				else{
					alert(result.message);
				}
			},
			error: function(result){
				alert('error');
				console.log(result);
			}
		});
	});
	/* მედიაში ფოლდერზე დაჭერის დროს ფილტრი */
	$('body').on('click','.folders ul li a.folder_link',function (e) {
		e.preventDefault();
		var $this = $(this);
		var ajax_url = $this.attr('href');
		var folder_id = $this.data('id');
		$.ajax({
			type:'POST',
			url: ajax_url,
			dataType: 'json',
			data: {
				folder_id: folder_id
			},
			success:function(result){
				if(result.status == 'ok') {
					$this.parents('ul').find('li').removeClass('active');
					$this.parent('li').addClass('active');
					$("#uploaded_files_container ul").html(result.response);
					$(".pagination ul").html(result.pager);
				}
				else{
					alert(result.message);
				}
			},
			error: function(result){
				alert('error');
				console.log(result);
			}
		});
	});
	// რესპონსივ მედია მენეჯერი
	$("div.media_manager div.media_manager_left div.add_search div.delete_search div.toggle_params a").click(function(){
		$("div.media_manager div.media_manager_right").addClass("visible");
	});
	$("div.media_manager div.media_manager_right div.close a").click(function(){
		$("div.media_manager div.media_manager_right").removeClass("visible");
	});
	// მოდალი
	$("body, body div.media_manager div.media_manager_left div.uploaded_files ul").on("click",".call_modal", function(e){
		e.preventDefault();
		var $this = $(this);
		var $href = $this.attr("href");
		var $id = $this.data("id");
		var isDeleteAjax = $this.hasClass("is-delete-ajax");
		var $csrfToken = $('meta[name="csrf-token"]').attr('content');
		var $loadIn = $this.data("load-in");
		var $loadIn2 = $this.data("load-in2");
		var modal_content = $("div.modal div.modal_content");
		var modal_id = $this.data("modal-id");
		var modal_type = $this.data("modal-type");
		var modal_title = $this.data("modal-title");
		var modal_desc = $this.data("modal-desc");

		$("div.modal_overlay, div.modal").fadeIn(200);
		$("div.modal").find("h1.modal_title").text(modal_title);

		if (modal_type === "edit_file_form"){
			get_folders_tree($this);
			modal_content.html(edit_file_form);
			modal_content
				.find("form")
					.attr("action", $href)
					.attr("data-id", $id)
					.attr("data-load-in", $loadIn)
				.find("input[name='_token']").attr("value", $csrfToken);
			var modal_selector = modal_content.find("select.selectori");
			var placeholder = modal_selector.data('placeholder') || 'Default placeholder';
			modal_selector.select2(selectori_parameters(placeholder));
		} else if (modal_type == 'modal_crop') {
			var x = $this.data('x');
			var y = $this.data('y');
			var width = Number($this.data('width'));
			var height = Number($this.data('height'));
			var left = Number($this.data('left'));
			var top = Number($this.data('top'));
			var featured_image = $(".featured_image");
			modal_content.html(crop_img);
			modal_content.find('#crop-img').attr("src", $(this).data('src'));

			const image = document.getElementById('crop-img');
			const cropper = new Cropper(image, {

				zoomOnWheel: false,
				cropBoxMovable: true,
				cropBoxResizable: true,
				viewMode:2,
				//minContainerWidth: 700,
				//minContainerWidth: 700,
				ready() {
					cropper.setCropBoxData({
						width: width,
						height: height,
						left: left,
						top: top,
					});
				},
			});
			$('#save').click(function(e){
				e.preventDefault();
				var cropperData = cropper.getData();
				var croppBoxData = cropper.getCropBoxData();

				$.ajax({
					type:'POST',
					url: $href,
					dataType: 'json',
					data: {
						crop_data: cropperData,
						crop_box_data: croppBoxData,
					},
					success:function(result){
						if(result.status == 'ok') {
							console.log($loadIn);
							$($loadIn).html(result.response);
						}
						else{
							alert(result.message);
						}
					},
					error: function(result){
						alert('error');
						console.log(result);
					}
				});
			});
		} else if (modal_type == 'modal_ajax_form') {
			$.ajax({
				type:'GET',
				url: $href,
				dataType: 'json',
				success:function(result){
					if(result.status == 'ok') {
						modal_content.html(result.response);
						var imgWrapper = modal_content.find('.img_wrapper');
						var imgWrapperWidth = Number(imgWrapper.width());
						var imgWrapperHeight = Number(imgWrapper.height());

						var img = modal_content.find('.img_wrapper img');
						var sourceWidth = Number(img.data('full-width'));
						var sourceHeight = Number(img.data('full-height'));
						var ratio = null;

						if(sourceWidth > sourceHeight && sourceWidth > imgWrapperWidth){
							ratio = sourceWidth / imgWrapperWidth;
			            }else{
			            	ratio = sourceHeight / imgWrapperHeight;
			            }

			            var imgPoint = modal_content.find('.img_wrapper .point');
			            var top = imgPoint.data('top') || imgWrapper.height() / 2 - imgPoint.height() / 2;
			            var left = imgPoint.data('left') || imgWrapper.width() / 2 - imgPoint.width() / 2;

						imgPoint
							.css({
								top: top,
								left: left
							})
							.draggable({ containment: "parent" });
						init_select2(modal_content);
					}
					else{
						alert(result.message);
					}
				},
				error: function(result){
					alert('error');
					console.log(result);
				}
			});
		} else if (modal_type === "delete_prompt"){
			modal_content.html(delete_prompt);
			modal_content
				.find("form")
					.attr("action", $href)
					.attr("data-delete-ajax", isDeleteAjax)
					.attr("data-id", $id)
					.attr("data-load-in", $loadIn)
				.find("input[name='_token']").attr("value", $csrfToken);
			if(typeof $loadIn2 !== "undefined") {
				modal_content.find("form").attr("data-load-in2", $loadIn2);
			}
		} else if (modal_type === "pages_listing"){
			var ajax_url = $(this).data('url');
			$.ajax({
				type:'POST',
				url: ajax_url,
				dataType: 'json',
				success:function(result){
					if(result.status == 'ok') {
						modal_content.html(result.response);
					}
					else{
						alert(result.message);
					}
				},
				error: function(result){
					alert('error');
					console.log(result);
				}
			});
		}
	});

	$('body').on('submit', '#search_in_reference', function (e) {
		e.preventDefault();
		var ajax_url = $(this).attr('action');
		var search = $('#search_reference').val();
		var modal_content = $("div.modal div.modal_content .pages_listing");
		console.log(search);
		$.ajax({
			type:'POST',
			url: ajax_url,
			dataType: 'json',
			data: {search: search},
			success:function(result){
				if(result.status == 'ok') {
					console.log(result.response);
					modal_content.html(result.response);
				}
				else{
					alert(result.message);
				}
			},
			error: function(result){
				alert('error');
				console.log(result);
			}
		});
	});

	/* save crop */
	$('body').on('click', '.save-crop', function (e) {
		e.preventDefault();
		var modal_content = $("div.modal div.modal_content");
		var imgWrapper = modal_content.find('.img_wrapper');
		var imgWrapperWidth = Number(imgWrapper.width());
		var imgWrapperHeight = Number(imgWrapper.height());
		var img = modal_content.find('.img_wrapper img');
		var sourceWidth = Number(img.data('full-width'));
		var sourceHeight = Number(img.data('full-height'));
		var ratio = null;

		if(sourceWidth > sourceHeight && sourceWidth > imgWrapperWidth){
			ratio = sourceWidth / imgWrapperWidth;
        }else{
        	ratio = sourceHeight / imgWrapperHeight;
        }

		var point = modal_content.find('.img_wrapper .point');
		var top = Math.floor(point.position().top * ratio);
		var left = Math.floor(point.position().left * ratio);
		var ajax_url = $(this).attr('href');

		$.ajax({
			type:'POST',
			url: ajax_url,
			dataType: 'json',
			data: {top: top,left: left},
		})
		.done(function(result) {
			if(result.status != 'ok')
			{
				alert(result.message);
			}
		});

	});

	function init_select2(content)
	{
		var data_selector = content.find("select.selectori");
		var placeholder = data_selector.data('placeholder') || 'Default placeholder';
		data_selector.select2(selectori_parameters(placeholder));
	}

	/* მოდალში თუ დააწვა რედაქტირებას */
	$('body').on('submit','.is-edit-ajax',function (e) {
		e.preventDefault();
		var ajax_url = $(this).attr('action');
		var data = new FormData($(this)[0]);
		var filter_varaibles = get_filter_variables();
		data.append('folder_id',filter_varaibles.folder_id);
		data.append('archive',filter_varaibles.archive);
		data.append('file_type',filter_varaibles.file_type);
		data.append('search',filter_varaibles.search);
		updateFile(data,ajax_url);
	});
	/* მიმაგრებული სურათის რედაქტირება featured_image */
	$('body').on('submit','.edit_featured_image',function (e) {
		e.preventDefault();
		var ajax_url = $(this).attr('action');
		var featured_image_title = $("#featured_image_title").val();
		$.ajax({
			type:'POST',
			url: ajax_url,
			dataType: 'json',
			data: {featured_image_title: featured_image_title},
			success: function(result) {
				if(result.status == 'ok') {
				}
				else{
					alert(result.message);
					console.log(result.message);
				}
			},
			error: function(result) {
				alert('error');
				console.log(result);
			}
		});
	});
	/* მოდალში რო დააქენსელებს მოდალის ფანჯარა რო დაიხუროს */
	$("body").on("click", "div.modal_overlay, div.modal div.close, div.modal .no", function(){
		$("div.modal_overlay, div.modal").fadeOut(200);
	});
	/* მოდალში წაშლას თუ დაააჭირა მაშინ იძახებს ajax-ს */
	$("body").on("click", "div.modal form[data-delete-ajax=true] div.delete_prompt .yes", function(e){
		e.preventDefault();
		var delete_url = $(this).parents("form").attr("action");
		var load_in = $(this).parents("form").data("load-in");
		var load_in2 = $(this).parents("form").data("load-in2");
		var $csrfToken = $('meta[name="csrf-token"]').attr("content");
		if($moduleName == 'media') {
			var data = get_filter_variables();
		}
		else{
			var data = {};
		}
		$.ajax({
			type:'DELETE',
			url: delete_url,
			dataType: 'json',
			data: data,
			success: function(result) {
				if(result.status == 'ok') {
					$(load_in).html(result.response);
					$(load_in).html(result.response2);
					//if(result.response2 && typeof load_in2 !== "undefined") {
					//$(load_in2).html(result.response2);
					//}
				}
				else{
					alert(result.message);
					console.log(result.message);
				}
				$("input.artform").artmediaForm();
			},
			error: function(result) {
				alert('error');
				console.log(result);
				$("input.artform").artmediaForm();
			}
		});
		$("div.modal_overlay, div.modal").fadeOut(200);
	});
	/* ფოლდერის დამატება */
	var newFolderInputName = $(".new_folder input[name=folder_title]");
	$("body").on("click", "#add_folder", function(e){
		e.preventDefault();

		if (!newFolderInputName.val().trim().length){
			newFolderInputName.parent().addClass("error");
			return false;
		}

		var ajax_url = $(this).data("url");
		var load_in = $(this).data("load-in");
		var title = $("#folder_title").val();
		var parent_id = $("#parent_id").val();
		$.ajax({
			type:'POST',
			url: ajax_url,
			dataType: 'json',
			data: {title: title,parent_id: parent_id},
			success:function(result){
				if(result.status == 'ok') {
					$(load_in).html(result.response);
					$("#folder_title").val("");
					$("#parent_id").select2("val", " ");
				}
				else{
					alert(result.message);
				}
			},
			error: function(result){
				alert('error');
				console.log(result);
			}
		});
	});
	newFolderInputName.on("keyup", function() {
		newFolderInputName.parent().removeClass("error");
	});
	// ბმულის კოპირება
	$(".link").click(function(){
		var $this = $(this);
		$this.find("input").focus();
		$this.find("input").select();
		document.execCommand("copy");
		$this.addClass("bump");
		setTimeout(function(){
			$(".link").removeClass("bump");
		}, 200);
	});
	// მენიუების სორტირება
	calcWidth($("#width_definer"));
	window.onresize = function(event) {
		calcWidth($("#width_definer"));
	};
	function calcWidth(obj){
		var titles = $(obj).siblings(".space").children(".route").children(".title");
		$(titles).each(function(index, element){
			var pTitleWidth = parseInt($(obj).css("width"));
			var leftOffset = parseInt($(obj).siblings(".space").css("margin-left"));
			var newWidth = pTitleWidth - leftOffset;
			$(element).css({
				"width": newWidth,
			})
			calcWidth(element);
		});
	}
	/* flat სორტირება */
	function sortFlat(index){
		var sortList = $(`.sort-flat${index}`);
		var ajax_url = sortList.data('url');
		sortList.sortable({
				update(event,ui){
					$.ajax({
						url: ajax_url,
						type: "POST",
						dataType: "json",
						data: {
							order: sortList.sortable("toArray")
						},
						success: function(response){
							if(response.status == "ok"){
								console.log(sortList.sortable("toArray"));
							}
							else{
								alert(response.message);
							}
						},
						error: function (error){
							alert("სორტირება არ შეინახა");
						}
					});
				}
			});
	}
	sortFlat('');
	sortFlat(2);

	// სორტირება
	var sortableOptions = {
		connectWith: ".is-sortable",
		tolerance: "pointer",
		placeholder: "drop-place",
		receive: function(event, ui){
			calcWidth($(this).parent(".item"));
		}
	};

	$(".is-sortable").sortable(sortableOptions);
	$(".is-sortable-y").sortable({
		...sortableOptions,
		axis: "y",
		connectWith: ".is-sortable-y"
	});
	$('.sort-tree').click(function(e) {
		e.preventDefault();
		var treeData = getChildrenList($('.root-is-sortable > li'));
		var ajax_url = $(this).data('url');
		$.ajax({
			type:'POST',
			url: ajax_url,
			dataType: 'json',
			data: {order: treeData},
			success:function(result){
				if(result.status == 'ok')
				{
					console.log('სორტირება შეინახა');
				}
				else{
					alert(result.message);
					console.log(result.message);
				}
			},
			error: function(result){
				alert('error');
				console.log(result);
			}
		});
	});
	// გამოჩენა დამალვა
	$('body').on('click','.call_visible_ajax', function(e) {
		e.preventDefault();
		var $this = $(this);
		var ajax_url = $this.attr('href');
		var loadin = $this.data('loadin');
		$.ajax({
			type:'POST',
			url: ajax_url,
			dataType: 'json',
			success:function(result){
				if(result.status == 'ok')
				{
					console.log(result.response);
					$this.parent().html(result.response);
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
	});
	function getChildrenList(item) {
		var data = [];
		item.each(function() {
			var $this = $(this);
			var listOfItems = $this.find('> ul.is-sortable > li');
			var hasList = !!listOfItems.length;
			data.push({
				id: $this.attr('id'),
				children: hasList ? getChildrenList(listOfItems) : []
			});
		});
		return data;
	}
	// ფორმის ველში გვერდის დამატების გამოჩენა
	$("div.form_wrap form div.tabs ul li input#tab2").change(function(){
		var $this = $(this);
		if($this.is(":checked")){
			$this.parents(".tabs").siblings("div.page").css({
				display: "block"
			});
			$this.parents(".tabs").siblings("div.menu").css({
				display: "none"
			});
		}
	});
	$("div.form_wrap form div.tabs ul li input#tab1").change(function(){
		var $this = $(this);
		if($this.is(":checked")){
			$this.parents(".tabs").siblings("div.page").css({
				display: "none"
			});
			$this.parents(".tabs").siblings("div.menu").css({
				display: "block"
			});
		}
	});
	// ფორმის ველში არჩეული გვერდის შეტანა
	$("body").on("click", "div.modal div.modal_content div.pages_listing ul li a.page_name", function(){
		var $this = $(this);
		var reference_id = $this.data("reference-id");
		var page_name = $this.find("span").text();
		var page_type = $this.find("em").text();
		$("#title").val(page_name);
		$("div.form_item.input_file div#added_page_name span").text(page_name);
		$("div.form_item.input_file div#added_page_name em").text("(" + page_type + ")");
		$("div.form_item.input_file input#reference_id").val(reference_id);
		$("div.form_item.input_file input#page_id").val(reference_id);
		$("div.form_item.input_file a.clear").addClass("visible");
		$("div.modal_overlay, div.modal").fadeOut(200);
	});
	if(!$("div.form_item.input_file div#added_page_name span, div.form_item.input_file div#added_page_name em").is(":empty")){
		$("div.form_item.input_file a.clear").addClass("visible");
	}
	$("div.form_item.input_file a.clear").click(function(){
		var $this = $(this);
		$this.siblings("div#added_page_name").find("span").empty();
		$this.siblings("div#added_page_name").find("em").empty();
		$this.siblings("input#reference_id").attr("name", "");
		$this.removeClass("visible");
	});
	// მენიუს დამატებისას გაუქმებული ველის გააქტუირება
	$("input.undisable").click(function(){
		var $this = $(this);
		if($this.is(":checked")){
			$this.parents(".artform_wrap").next("input").prop({
				disabled: true
			});
		}else{
			$this.parents(".artform_wrap").next("input").prop({
				disabled: false
			}).focus();
		}
	});
	// ფორმის ველში ფაილის შეტანის მოქმედება
	$("div.form_item.input_file input[type='text']").each(function(){
		var $this = $(this);
		var vali = $this.val();
		if(vali < 1){
			$this.siblings("a.view").removeClass("visible");
		}else{
			$this.siblings("a.view").addClass("visible");
		}
		$this.change(function(){
			var $this = $(this);
			var vali = $this.val();
			if(vali < 1){
				$this.siblings("a.view").removeClass("visible");
			}else{
				$this.siblings("a.view").addClass("visible");
			}
		});
	});
	// როცა ნიშნავს checkbox hidden ველში იცვლება მნიშვნელობა 1-ზე სხვა დროს 0-ზე
	$("body").on("change","input[type='checkbox']",function(){
		var $this = $(this);
		var name = $(this).data('name');
		if ($(this).is(':checked')) {
			console.log('checked');
			$("input[name='"+name+"']").val(1);
		} else {
			console.log('not checked');
			$("input[name='"+name+"']").val(0);
		}
	});
	/* ფაილის მიბმის ველში ფაილის ნახვა თუ არაა ცარიელი მნიშვნელობა */
	$("a.view_file").click(function() {
		var fieldID = $(this).data('field-id');
		var src = $('#'+fieldID).val();
		if(src.length > 0) {
			var url = $storageUrl+'/'+src;
			console.log(url);
			$(this).attr('href',url);
		} else {
			return false;
		}
	});
	/* მედია მენეჯერის გამოძახება */
	$(".media_manager a.attach").click(function(e){
		e.preventDefault();
		var name = $(this).data("name");
		var url = $(this).attr("href");
		var width = $(this).data("width");
		var height = $(this).data("height");
		if(typeof width === 'undefined') {
			width = '1000';
		}
		if(typeof height === 'undefined') {
			height = '700';
		}
        window.open(url, 'mediamanager', 'left=20,top=20,width='+width+',height='+height+',toolbar=0,resizable=1,scrollbars=yes');
    });
    $('body').on('click','.add_item',function(e){
    	e.preventDefault();
    	var ajax_url = $(this).attr('href');
    	ajax(ajax_url,'div.dynamic_form_items .items_wrapper',{});
    });
	// ენების დამატების გამოჩენა
	$("div.page_inside div.page_widget h2.title strong u.trigger").click(function(){
		var $this = $(this);
		if($this.is(".rotated")){
			$this.removeClass("rotated");
			$this.next("u.langs").removeClass("visible");
		}else{
			$this.addClass("rotated");
			$this.next("u.langs").addClass("visible");
		}
	});
	$(document).click(function(e){
		if(!$(e.target).closest("div.page_inside div.page_widget h2.title strong u.trigger").length > 0){
			$("div.page_inside div.page_widget h2.title strong u.trigger").removeClass("rotated");
			$("div.page_inside div.page_widget h2.title strong u.langs").removeClass("visible");
		}
	});
	$('body').on('change','select#position',function() {
		var param_index = $('#position :selected').val();
		var ajax_url = $('#position').data('url');
		$.ajax({
			type:'POST',
			url: ajax_url,
			dataType: 'json',
			data: {param_index: param_index},
			success:function(result){
				if(result.status == 'ok') {
					$('#params').val(result.response);
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
	});
	$('body').on('change','#page_type_id',function() {
		var page_type = $('#page_type_id :selected').val();
		var ajax_url = $('#page_type_id').data('url');
		$.ajax({
			type:'POST',
			url: ajax_url,
			dataType: 'json',
			data: {page_type: page_type},
			success:function(result){
				if(result.status == 'ok') {
					console.log(result.response);
					$("#template").html(result.response);
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
	});
	// ტაბები
	$(".tab_list").on("click", ".tab", function(e){
		e.preventDefault();
		$(".tab").removeClass("active");
		$(".tab_content").removeClass("show");
		$(this).addClass("active");
		$($(this).attr("href")).addClass("show");
	});
	// კალენდრის თოგლი
	$("div.logs div.logs_title a.calendar_toggle").click(function(){
		$(this).next("div#calendar-log-calendar").stop().fadeToggle(200);
	});
	// Tree Menu Trigger
	$('.tree_menu_trigger .artform_wrap').each(function() {
		$(this).on('change', function() {
			if ($(this).hasClass('checked')) {
				$(this).closest('li').addClass('active');
				$(this).parent('.tree_item').next('ul').find('li').addClass('active').find('.tree_item .artform_wrap').addClass('checked').find('input').prop('checked', true);
			} else {
				$(this).closest('li').removeClass('active');
				$(this).parent('.tree_item').next('ul').find('li').removeClass('active').find('.tree_item .artform_wrap').removeClass('checked').find('input').prop('checked', false);
			}

			var closestUl = $(this).closest('ul');
			if (closestUl.find('li').length == closestUl.find('li.active').length) {
				closestUl.prev().find('.artform_wrap').addClass('checked').find('input').prop('checked', true);
			} else {
				closestUl.prev().find('.artform_wrap').removeClass('checked').find('input').prop('checked', false);
			}
		});
	});
	/* მარკერის დამატება რედაქტირება */
	$('body').on('submit','#marker_form',function (e) {
		e.preventDefault();
		var ajax_url = $(this).attr('action');
		var title = $('#title').val();
		var desc = $('#desc').val();

		$.ajax({
			type:'POST',
			url: ajax_url,
			dataType: 'json',
			data: {title: title,desc: desc},
			success: function(result) {
				$("div.modal_overlay, div.modal").fadeOut(50);
				if(result.status == 'ok') {
					console.log(result.response);
					$("#markers_wrapper ul").html(result.response);
					$("#map_wrapper").html(result.response2);
				}
				else{
					alert(result.message);
					console.log(result.message);
				}
			},
			error: function(result) {
				alert('error');
				console.log(result);
			}
		});
	});
	/* save map layout */
	$('body').on('click','#save_map_layout',function (e) {
		e.preventDefault();
		var ajax_url = $(this).attr('href');
		var map_type = $("#map_type option:selected").val();
		var myForm = document.getElementById('map_options');
		var formData = new FormData(myForm);
		formData.append('map_type',map_type);
		$.ajax({
			type:'POST',
			url: ajax_url,
			dataType: 'json',
			data: formData,
			processData: false,
			contentType: false,
			success: function(result) {
				if(result.status == 'ok') {

				}
				else{
					alert(result.message);
					console.log(result.message);
				}
			},
			error: function(result) {
				alert('error');
				console.log(result);
			}
		});
	});

	// Toggle tree menu child list
	$('.menu_tree .toggle-list').on('click', function() {
		$(this)
			.toggleClass('is-collapsed')
			.parents('.item')
			.siblings('ul')
			.slideToggle(200, function() {
				// $(this).css({
				// 	'visibility': 'hidden',
				// 	'opacity': 0
				// });
			});
	});

	// Help smooth scroll
	$(".help a").each(function () {
		var $this = $(this);
		var href = $this.attr("href");
		if (href.includes("#")) {
			$this.on("click", function (event) {
				event.preventDefault();
				var id = href.split("#").pop();
				$('html, body').animate({
					scrollTop: $(`.help_content #${id}`).offset().top
				}, 500);
			});
		}
	});
});
