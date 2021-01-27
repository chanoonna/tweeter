const showIcon = function() {
  const scroll = document.scrollingElement;
  const $icon = $('#scrollUpButton');

  if (scroll.scrollTop > 400) {
    $icon.removeClass('hide');
    return;
  }

  $icon.addClass('hide');
};

$(document).ready(function() {
  $('#scrollUpButton').on('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  $(window).on('scroll', showIcon);
});
