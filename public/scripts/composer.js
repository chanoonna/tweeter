// A function for an upscroll icon to show or hide
const showIcon = function() {
  const scroll = document.scrollingElement;
  const $icon = $('#scrollUpButton');

  if (scroll.scrollTop > 400) {
    $icon.removeClass('hide');
    return;
  }

  $icon.addClass('hide');
};

// When scroll icon clicekd, it goes to the top.
// If you want to make it focus on new tweet, convert in to focus on that.
$(document).ready(function() {
  $('#scrollUpButton').on('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  $(window).on('scroll', showIcon);
});
