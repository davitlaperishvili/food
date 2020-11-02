<div class="content">
	<div class="contact_wrap">
		<div class="contact_top">
			<address>
				<h3>არტმედია</h3>
				<ul>
					<li>
						<em class="fal fa-map-marker-alt"></em>
						<span>მისამართის ტექსტი</span>
					</li>
					<li>
						<em class="fal fa-phone"></em>
						<span>
							<a href="tel:+0790 51 41 01" title="0790 51 41 01">0790 51 41 01</a>
						</span>
					</li>
					<li>
						<em class="fal fa-mobile"></em>
						<span>
							<a href="tel:+598 31 33 30" title="598 31 33 30">598 31 33 30</a>
						</span>
					</li>
					<li>
						<em class="fal fa-envelope"></em>
						<span>
							<a href="mailto:welcome@artmedia.ge" title="welcome@artmedia.ge">welcome@artmedia.ge</a>
						</span>
					</li>
					<li>
						<em class="fab fa-facebook-f"></em>
						<span>
							<a href="https://facebook.com/webartmedia" title="https://facebook.com/webartmedia" target="_blank">fb.com/webartmedia</a>
						</span>
					</li>
				</ul>
			</address>
			<div class="contact_form">
				<form action="index.php" autocomplete="off">
					<div class="form_item">
						<input type="text" name="" placeholder="სახელი">
					</div>
					<div class="form_item">
						<input type="email" name="" placeholder="ელფოსტა">
					</div>
					<div class="form_item">
						<textarea placeholder="ტექსტი"></textarea>
					</div>
					<div class="form_item contact_form_submit">
						<button type="submit" class="gilaki">გაგზავნა</button>
					</div>
				</form>
			</div>
		</div>
		<div id="map" class="map"></div>
		<script type="text/javascript" src="https://maps.google.com/maps/api/js?key=AIzaSyA8wABvz-QflF___QEdOdHQHm9dG1ppU8Q"></script>
		<script type="text/javascript">
			google.maps.event.addDomListener(window, "load", init);
			function init(){
				var mapOptions = {
					zoom: 15,
					center: new google.maps.LatLng(41.719316, 44.802263),
					mapTypeId: google.maps.MapTypeId.ROADMAP,
					mapTypeControl: false,
					scaleControl: false,
					zoomControl: true,
					streetViewControl: false,
					scrollwheel: true,
					styles: [{
						elementType: 'geometry',
						stylers: [{
							color: '#f2f2f2'
						}]
					}, {
						elementType: 'labels.text.fill',
						stylers: [{
							color: '#505050'
						}]
					}, {
						featureType: 'administrative.locality',
						elementType: 'labels.text.fill',
						stylers: [{
							color: '#505050'
						}]
					}, {
						featureType: 'poi',
						//elementType: 'labels.text.fill',
						stylers: [{
							visibility: 'off'
							//color: '#ffffff'
						}]
					}, {
						featureType: 'poi.park',
						elementType: 'geometry',
						stylers: [{
							color: '#777777'
						}]
					}, {
						featureType: 'poi.park',
						elementType: 'labels.text.fill',
						stylers: [{
							color: '#505050'
						}]
					}, {
						featureType: 'road',
						elementType: 'geometry',
						stylers: [{
							color: '#ffffff'
						}]
					}, {
						featureType: 'road',
						elementType: 'geometry.stroke',
						stylers: [{
							color: '#ffffff'
						}]
					}, {
						featureType: 'road',
						elementType: 'labels.text.fill',
						stylers: [{
							color: '#505050'
						}]
					}, {
						featureType: 'road.highway',
						elementType: 'geometry',
						stylers: [{
							color: '#ffffff'
						}]
					}, {
						featureType: 'road.highway',
						elementType: 'geometry.stroke',
						stylers: [{
							color: '#ffffff'
						}]
					}, {
						featureType: 'road.highway',
						elementType: 'labels.text.fill',
						stylers: [{
							color: '#505050'
						}]
					}, {
						featureType: 'transit',
						//elementType: 'geometry',
						stylers: [{
							visibility: 'off'
							//color: '#2f3948'
						}]
					}, {
						featureType: 'transit.station',
						elementType: 'labels.text.fill',
						stylers: [{
							color: '#505050'
						}]
					}, {
						featureType: 'water',
						elementType: 'geometry',
						stylers: [{
							color: '#777777'
						}]
					}, {
						featureType: 'water',
						elementType: 'labels.text.fill',
						stylers: [{
							color: '#505050'
						}]
					}, {
						featureType: 'water',
						elementType: 'labels.text.stroke',
						stylers: [{
							color: '#505050'
						}]
					}]
				};
				var mapElement = document.getElementById("map");
				var map = new google.maps.Map(mapElement, mapOptions);
				var locations = [
					[41.719316, 44.802263]
				];
				for (i = 0; i < locations.length; i++){
					marker = new google.maps.Marker({
						position: new google.maps.LatLng(locations[i][0], locations[i][1]),
						map: map,
						icon: 'themes/images/marker.png',
					});
				}
			};
		</script>
	</div>
</div>