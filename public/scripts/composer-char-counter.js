$(document).ready(function() {
  $('#tweet-text').on('keydown keyup', function() {
    if (this.value.length > 140) {
      $(this).parent().find('.counter').addClass('counter-red');
    } else {
      $(this).parent().find('.counter').removeClass('counter-red');
    }
  });
});
