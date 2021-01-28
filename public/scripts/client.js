/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// escapte function to stringify tweet content which can cause html tag malfunction.

const escape = function(text) {
  const escaped = document.createElement('div');
  escaped.appendChild(document.createTextNode(text));

  return escaped.innerHTML;
};

const createTweetElement = function(data) {
  return `
    <article class="tweet">
      <header>
        <img src="${data.user.avatars}">
        <div>
          <span>${data.user.name}</span>
          <span>${data.user.handle}</span>
        </div>
      </header>
      <p>${escape(data.content.text)}</p>
      <footer>
        <div>${timeago.format(data.created_at)}</div>
        <div>
          <i class="fab fa-font-awesome-flag xs"></i>
          <i class="fas fa-retweet xs"></i>
          <i class="fas fa-heart xs"></i>
        </div>
      </footer>
    </article>
  `;
};

const renderTweets = function(data) {
  let html = '';

  const sorted = data.sort((a, b) => a.created_at > b.created_at ? -1 : 1);

  sorted.forEach(tweet => {
    html += createTweetElement(tweet);
  });

  return html;
};

$(document).ready(function() {
  const $form = $('.new-tweet').children('form');

  $form.on('submit', function(e) {
    e.preventDefault();
  });
    
  $form.on('submit', function() {
    const $tweet = $('#tweet-text');
    const content = $tweet.val().trim();
    const errorMessageTarget = $('.new-tweet').find('span');

    // Prevents submitting from 0 length and length over 140 contents.
    if (content.length === 0) {
      errorMessageTarget.html('No content');
      setTimeout(() => $('.new-tweet').find('span').html(''), 2000);

      return;
    } else if (content.length > 140) {
      console.log('I disabled the submit button. Nice try!');

      return;
    }

    $.post("/tweets", $($form).serialize(), function() {
      $tweet.val('');
      $('.counter').html('140');
      $('main').removeClass('clicked');

      $.ajax('/tweets', { method: 'GET' })
        .then(function(data) {
          $('#tweets-container').html(renderTweets(data));
        });
    });
  });
});

$(document).ready(function() {
  $('.new-tweet-show').on('click', function() {
    if ($('.new-tweet').hasClass('clicked')) {
      $('.new-tweet').removeClass('clicked');
      
      return;
    }

    $('.new-tweet').addClass('clicked');
    document.getElementById('tweet-text').focus();
  });
});

$(document).ready(function() {
  $.ajax('/tweets', { method: 'GET' })
    .then(function(data) {
      $('#tweets-container').html(renderTweets(data));
    });
});

let counter = 0;

$(document).ready(function() {
  const source = new EventSource('/sse/tweets');

  source.addEventListener('message', event => {
    $('#tweets-container').html(renderTweets(JSON.parse(event.data)));
    counter += 1;
  });
  source.removeEventListener('end', () => {
    console.log('Lost connection');
  });
});
