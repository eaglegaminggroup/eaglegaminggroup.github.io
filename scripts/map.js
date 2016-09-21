$(document).ready(function() {
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