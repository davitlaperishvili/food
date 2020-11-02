const ICON_MOVE = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="5 9 2 12 5 15" /><polyline points="9 5 12 2 15 5" /><polyline points="15 19 12 22 9 19" /><polyline points="19 9 22 12 19 15" /><line x1="2" y1="12" x2="22" y2="12" /><line x1="12" y1="2" x2="12" y2="22" /></svg>`;
const ICON_SAVE = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>`;

export const edit_file_form = `<form action="" autocomplete="off">
			<div class="form_item">
				<label for="title">სახელი</label>
				<input name="title" type="text" id="title">
			</div>
			<div class="form_item">
				<label for="form2">ფოლდერი</label>
				<select name="folder_id" id="folder_id" class="selectori" data-placeholder="აირჩიეთ">
					<option></option>
					<option>ყველა</option>
					<option>სურათები</option>
					<option>დოკუმენტები</option>
				</select>
			</div>
			<div class="form_item form_submit">
				<button class="gilaki" type="submit">შეცვლა</button>
			</div>
		</form>`;

export const delete_prompt = `<form method="POST">
		<input name="_method" type="hidden" value="DELETE">
		<input name="_token" type="hidden">
		<div class="delete_prompt">
			<button class="gilaki yes" type="submit" title="წაშლა">წაშლა</button>
			<a href="javascript:void(0);" class="gilaki no" title="არა">არა</a>
		</div>
	</form>`;

export const crop_img = `<div class="modal-crop-img">
		<div class="frame">
			<img src="#!" id="crop-img">
		</div>
		<div class="crop-controls">
			<a href="#" id="fit" title="Fit image">${ICON_MOVE}</a>
			<a href="#" id="save" title="Save">${ICON_SAVE}</a>
		</div>
	</div>`;

export const pages_listing = `<div class="pages_listing">
			<ul>
				<li>
					<a href="#" target="_blank" class="page_icon">
						<em data-feather="link"></em>
					</a>
					<a href="javascript:void(0);" title="გვერდის სახელი" class="page_name" data-page-id="672">
						<span>გვერდის სახელი</span>
						<em>Static</em>
					</a>
				</li>
				<li>
					<a href="#" target="_blank" class="page_icon">
						<em data-feather="link"></em>
					</a>
					<a href="javascript:void(0);" title="გვერდის სახელი" class="page_name" data-page-id="672">
						<span>გვერდის სახელი</span>
						<em>Static</em>
					</a>
				</li>
				<li>
					<a href="#" target="_blank" class="page_icon">
						<em data-feather="link"></em>
					</a>
					<a href="javascript:void(0);" title="გვერდის სახელი" class="page_name" data-page-id="672">
						<span>გვერდის სახელი</span>
						<em>Static</em>
					</a>
				</li>
				<li>
					<a href="#" target="_blank" class="page_icon">
						<em data-feather="link"></em>
					</a>
					<a href="javascript:void(0);" title="გვერდის სახელი" class="page_name" data-page-id="672">
						<span>გვერდის სახელი</span>
						<em>Static</em>
					</a>
				</li>
				<li>
					<a href="#" target="_blank" class="page_icon">
						<em data-feather="link"></em>
					</a>
					<a href="javascript:void(0);" title="გვერდის სახელი" class="page_name" data-page-id="672">
						<span>გვერდის სახელი</span>
						<em>Static</em>
					</a>
				</li>
				<li>
					<a href="#" target="_blank" class="page_icon">
						<em data-feather="link"></em>
					</a>
					<a href="javascript:void(0);" title="გვერდის სახელი" class="page_name" data-page-id="672">
						<span>გვერდის სახელი</span>
						<em>Static</em>
					</a>
				</li>
				<li>
					<a href="#" target="_blank" class="page_icon">
						<em data-feather="link"></em>
					</a>
					<a href="javascript:void(0);" title="გვერდის სახელი" class="page_name" data-page-id="672">
						<span>გვერდის სახელი</span>
						<em>Static</em>
					</a>
				</li>
				<li>
					<a href="#" target="_blank" class="page_icon">
						<em data-feather="link"></em>
					</a>
					<a href="javascript:void(0);" title="გვერდის სახელი" class="page_name" data-page-id="672">
						<span>გვერდის სახელი</span>
						<em>Static</em>
					</a>
				</li>
				<li>
					<a href="#" target="_blank" class="page_icon">
						<em data-feather="link"></em>
					</a>
					<a href="javascript:void(0);" title="გვერდის სახელი" class="page_name" data-page-id="672">
						<span>გვერდის სახელი</span>
						<em>Static</em>
					</a>
				</li>
				<li>
					<a href="#" target="_blank" class="page_icon">
						<em data-feather="link"></em>
					</a>
					<a href="javascript:void(0);" title="გვერდის სახელი" class="page_name" data-page-id="672">
						<span>გვერდის სახელი</span>
						<em>Static</em>
					</a>
				</li>
				<li>
					<a href="#" target="_blank" class="page_icon">
						<em data-feather="link"></em>
					</a>
					<a href="javascript:void(0);" title="გვერდის სახელი" class="page_name" data-page-id="672">
						<span>გვერდის სახელი</span>
						<em>Static</em>
					</a>
				</li>
				<li>
					<a href="#" target="_blank" class="page_icon">
						<em data-feather="link"></em>
					</a>
					<a href="javascript:void(0);" title="გვერდის სახელი" class="page_name" data-page-id="672">
						<span>გვერდის სახელი</span>
						<em>Static</em>
					</a>
				</li>
				<li>
					<a href="#" target="_blank" class="page_icon">
						<em data-feather="link"></em>
					</a>
					<a href="javascript:void(0);" title="გვერდის სახელი" class="page_name" data-page-id="672">
						<span>გვერდის სახელი</span>
						<em>Static</em>
					</a>
				</li>
				<li>
					<a href="#" target="_blank" class="page_icon">
						<em data-feather="link"></em>
					</a>
					<a href="javascript:void(0);" title="გვერდის სახელი" class="page_name" data-page-id="672">
						<span>გვერდის სახელი</span>
						<em>Static</em>
					</a>
				</li>
				<li>
					<a href="#" target="_blank" class="page_icon">
						<em data-feather="link"></em>
					</a>
					<a href="javascript:void(0);" title="გვერდის სახელი" class="page_name" data-page-id="672">
						<span>გვერდის სახელი</span>
						<em>Static</em>
					</a>
				</li>
				<li>
					<a href="#" target="_blank" class="page_icon">
						<em data-feather="link"></em>
					</a>
					<a href="javascript:void(0);" title="გვერდის სახელი" class="page_name" data-page-id="672">
						<span>გვერდის სახელი</span>
						<em>Static</em>
					</a>
				</li>
				<li>
					<a href="#" target="_blank" class="page_icon">
						<em data-feather="link"></em>
					</a>
					<a href="javascript:void(0);" title="გვერდის სახელი" class="page_name" data-page-id="672">
						<span>გვერდის სახელი</span>
						<em>Static</em>
					</a>
				</li>
				<li>
					<a href="#" target="_blank" class="page_icon">
						<em data-feather="link"></em>
					</a>
					<a href="javascript:void(0);" title="გვერდის სახელი" class="page_name" data-page-id="672">
						<span>გვერდის სახელი</span>
						<em>Static</em>
					</a>
				</li>
				<li>
					<a href="#" target="_blank" class="page_icon">
						<em data-feather="link"></em>
					</a>
					<a href="javascript:void(0);" title="გვერდის სახელი" class="page_name" data-page-id="672">
						<span>გვერდის სახელი</span>
						<em>Static</em>
					</a>
				</li>
				<li>
					<a href="#" target="_blank" class="page_icon">
						<em data-feather="link"></em>
					</a>
					<a href="javascript:void(0);" title="გვერდის სახელი" class="page_name" data-page-id="672">
						<span>გვერდის სახელი</span>
						<em>Static</em>
					</a>
				</li>
			</ul>
		</div>`;
