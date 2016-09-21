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

});