// Code goes here

$(document).ready(function() {
  
  $('#calendar').fullCalendar({
        header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,basicWeek,basicDay'
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
    
});