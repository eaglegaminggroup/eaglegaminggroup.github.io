// Code goes here

$(document).ready(function() {
    
  $('#calendar').fullCalendar({
    eventColor: '#801818',
    handleWindowResize: true,
    height: 'auto',
    header: {
				left: 'prev,next',
				center: 'title',
        right: 'today'
			},
    googleCalendarApiKey: 'AIzaSyClqptXueR8OxUDbzJj6l0DRvKLf0eQle4',
    events: {
        googleCalendarId: 'vni6ftgjath7hu5ssh62j0o8ck@group.calendar.google.com'
    },
    eventAfterAllRender: function() {
      $('.fc-event').removeAttr('href');
    }
  });
  
  $('.fc-event').removeAttr('href');
  
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
    map.setCenter(gameHQ);
    map.setZoom(initialZoom);
  });

  initialize();  
    
});

var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var gameHQ = new google.maps.LatLng(35.375862, -97.528037);
var initialZoom = 16;
var map;

var googleMapsBtn;
// initialize map
function initialize() {

  var mapOptions = {
    zoom: initialZoom,
    center: gameHQ,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true
  }
  map = new google.maps.Map(document.getElementById("map"), mapOptions);

  var marker = new google.maps.Marker({
      position: gameHQ,
      map: map,
      title: 'Game HQ'
  });

  google.maps.event.addListener(map, 'center_changed', function() {
    if(map.getCenter() == gameHQ)
    {
      $('#reset-map').addClass('disabled');
    }
    else {
      $('#reset-map').removeClass('disabled');
    }
  });

}