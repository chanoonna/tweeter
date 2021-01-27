$(document).ready(function() {

  // Couldn't find a way to fire up the listener for not releasing a key. Update if has knowledge.
  $('#tweet-text').on('keydown keyup', function() {
    const $parent = $(this).parent();

    if (this.value.length > 140) {
      $parent.find('.counter').addClass('counter-red');
      $parent.find('button').addClass('button-function');
      $parent.find('button').attr('disabled', true);
    } else {
      $parent.find('.counter').removeClass('counter-red');
      $parent.find('button').removeClass('button-function');
      $parent.find('button').removeAttr('disabled');
    }
  });
});
