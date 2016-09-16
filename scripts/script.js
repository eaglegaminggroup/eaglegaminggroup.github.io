// Code goes here

$(document).ready(function() {
  
  // $('#calendar').fullCalendar({
  //       header: {
	// 			left: 'prev,next today',
	// 			center: 'title',
	// 			right: 'month,basicWeek,basicDay'
	// 		}
  // });
  
  $('#calendar').fullCalendar({
        googleCalendarApiKey: 'AIzaSyClqptXueR8OxUDbzJj6l0DRvKLf0eQle4',
        events: {
            googleCalendarId: '1062258359464-ue4mc5hk6fqrbamjb25m8h2svn406pv8.apps.googleusercontent.com'
        }
    });
  
  $('#signup-dm').click(function(){
    $('#form-collapse').collapse('hide');
    $(this).addClass('active');
    $('#signup-player').removeClass('active');
  });
  
  $('#signup-player').click(function(){
    $('#form-collapse').collapse('show');
    $(this).addClass('active');
    $('#signup-dm').removeClass('active');
  });
  
  $('#reset-map').click(function() {
    map.setCenter(church);
    map.setZoom(initialZoom);
  });

  initialize();  
    
});

var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var church = new google.maps.LatLng(35.513238, -97.631599);
var initialZoom = 16;
var map;

var googleMapsBtn;
// initialize map
function initialize() {

  var mapOptions = {
    zoom: initialZoom,
    center: church,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true
  }
  map = new google.maps.Map(document.getElementById("map"), mapOptions);

  var marker = new google.maps.Marker({
      position: church,
      map: map,
      title: 'Bethany First Church of the Nazarene'
  });

  google.maps.event.addListener(map, 'center_changed', function() {
    if(map.getCenter() == church)
    {
      $('#reset-map').addClass('disabled');
    }
    else {
      $('#reset-map').removeClass('disabled');
    }
  });

}