// Code goes here

$(document).ready(function() {
    
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