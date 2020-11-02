<div class="form_item form_checkers">
	<input type="text" placeholder="ტექსტი">
	<div class="error_message">არასწორად შევსებული ველი</div>
</div>

<div class="form_item">
	<div class="form_checkers">
		<div class="checker_wrap">
			<input type="radio" class="artform" name="rad" value="rad1" id="rad1" checked="checked">
			<label for="rad1">მოსანიშნი 1</label>
		</div>
		<div class="checker_wrap">
			<input type="radio" class="artform" name="rad" value="rad2" id="rad2">
			<label for="rad2">მოსანიშნი 2</label>
		</div>
	</div>
</div>

<div class="form_item">
	<div class="form_checkers">
		<div class="checker_wrap">
			<input type="checkbox" class="artform" name="check" id="check1">
			<label for="check1">ჩასაწკაპი</label>
		</div>
	</div>
</div>

<div class="form_item">
	<select class="selectori" data-placeholder="აირჩიეთ">
		<option></option>
		<option>არჩევანი 1</option>
		<option>არჩევანი 2</option>
	</select>
</div>

<div class="form_item">
	<div class="file_uploader">
		<input type="file" name="filename" id="filename1" class="artfile" data-multiple-caption="{count} არჩეული ფაილი" multiple>
		<label for="filename1">
			<span></span>
			<strong>არჩევა</strong>
		</label>
	</div>
</div>

<div class="form_item">
	<button class="gilaki">გაგზავნა</button>
</div>