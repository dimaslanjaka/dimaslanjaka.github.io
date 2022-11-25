/**
* @package jQuery
*/

$('button#getID').click(function(e){
  e.preventDefault();
  $.ajax({
    url: 'https://httpbin.org/uuid',
    method: 'get',
    success: function(data){
      $('textarea#authID').val(data.uuid);
    }
  });
});