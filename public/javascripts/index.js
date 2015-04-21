//Google Maps
var map;
function initialize() {
	var mapOptions = {
		zoom: 3,
		center: new google.maps.LatLng(0, -180),
		mapTypeId: google.maps.MapTypeId.TERRAIN
	};

	map = new google.maps.Map(document.getElementById('map-canvas'),
		mapOptions);

	var flightPlanCoordinates = [
	new google.maps.LatLng(37.772323, -122.214897),
	new google.maps.LatLng(21.291982, -157.821856),
	new google.maps.LatLng(-18.142599, 178.431),
	new google.maps.LatLng(-27.46758, 153.027892)
	];
	var flightPath = new google.maps.Polyline({
		path: flightPlanCoordinates,
		geodesic: true,
		strokeColor: '#FF0000',
		strokeOpacity: 1.0,
		strokeWeight: 2
	});

	flightPath.setMap(map);
}

google.maps.event.addDomListener(window, 'load', initialize);




$(function(){
	$('#path-btn').click(function(e){
		e.preventDefault();
		//make object and get data
		var pid = $('#personid').val();
		var t1 = parseInt($('#timeone').val());
		var t2 = parseInt($('#timetwo').val());
		//console.log(pid);
		$.get("path",{pid: pid,t1: t1,t2: t2}, function(data, status){
			personPath = [];
			for(var i = 0; i < data.length; i++)
			{
				personPath.push(new google.maps.LatLng(data[i].x, data[i].y));
			}
			var pPath = new google.maps.Polyline({
				path: personPath,
				geodesic: true,
				strokeColor: '#00FF00',
				strokeOpacity: 1.0,
				strokeWeight: 2
			});

			pPath.setMap(map);
			map.setCenter(personPath[personPath.length - 1]);
		});
	});
});


