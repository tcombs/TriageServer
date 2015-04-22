//Google Maps
var map;
function initialize() {
	var mapOptions = {
		zoom: 10,
		center: new google.maps.LatLng(35.2086, -97.4458),
		mapTypeId: google.maps.MapTypeId.TERRAIN
	};

	map = new google.maps.Map(document.getElementById('map-canvas'),
		mapOptions);

}

google.maps.event.addDomListener(window, 'load', initialize);




$(function(){
	$('#path-btn').click(function(e){
		e.preventDefault();
		//make object and get data
		var pid = $('#personid').val();
		var t1 = parseInt($('#timeone').val());
		var t2 = parseInt($('#timetwo').val());
		var sim = $('#sim-db').hasClass('active');
		//console.log(pid);
		$.get("path",{pid: pid,t1: t1,t2: t2,sim:sim}, function(data, status){
			personPath = [];
			for(var i = 0; i < data.length; i++)
			{
				var x = data[i].x;
				var y = data[i].y;
				console.log(x + ' ' + y);
				if(sim){
					x = (x/2500)*(50*1/69) - 97.4458;
					y = (y/2500)*(50*1/69) + 35.2086;
				}
				
				personPath.push(new google.maps.LatLng(y,x));
				//console.log(x + ' ' + y);
			}
			var pPath = new google.maps.Polyline({
				path: personPath,
				geodesic: true,
				strokeColor: '#00FF00',
				strokeOpacity: 1.0,
				strokeWeight: 2
			});
			// var marker = new google.maps.Marker({
			// 	position: new google.maps.LatLng(35.2086, -97.4458),
			// 	map: map,
			// 	title: 'Start Position'
			// });
			pPath.setMap(map);
			map.setZoom(14);
			map.setCenter(personPath[personPath.length - 1]);
			//map.setCenter(new google.maps.LatLng(35.2086, -97.4458));
			//console.log(personPath);
		});
	});



$('#region-btn').click(function(e){
	e.preventDefault();
		//make object and get data
		var x1 = parseFloat($('#x1').val());
		var x2 = parseFloat($('#x2').val());
		var y1 = parseFloat($('#y1').val());
		var y2 = parseFloat($('#y2').val());
		var time = parseInt($('#time').val());
		var sim = $('#sim-db').hasClass('active');

		$.get("region",{x1:x1,x2:x2,y1:y1,y2:y2,time:time,sim:sim} , function(data, status){
			for(var i = 0; i < data.length; i++)
			{
				var x = data[i].x;
				var y = data[i].y;
				var image;
				if(data[i].pid.indexOf("p") > -1) {
					image = 'images/redcross.png';
				}
				else {
					image = 'images/cas.png'
				}
				//console.log(x + ' ' + y);
				if(sim)
				{
					x = (x/2500)*(50*1/69) - 97.4458;
					y = (y/2500)*(50*1/69) + 35.2086;
				}
				
				console.log('mapping ...');
				var marker = new google.maps.Marker({
					position: new google.maps.LatLng(y,x),
					map: map,
					title: data[i].pid,
					icon: image
				});
				map.setCenter(new google.maps.LatLng(data[0].y,data[0].x));
			}
		});
	});
$('.db-option').click(function(e){
	console.log('I Am Here');
	$('.db-option').removeClass('active');
	$(this).addClass('active');
});
});


