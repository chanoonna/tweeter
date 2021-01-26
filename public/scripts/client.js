/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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
      <p>${data.content.text}</p>
      <footer>
        <div>${new Date(data.created_at).toLocaleString()}</div>
        <div>Icons</div>
      </footer>
    </article>
  `;
};

const renderTweets = function(data, target) {
  data.forEach(tweet => {
    $(target).append(createTweetElement(tweet));
  });
};

$(document).ready(function() {
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  renderTweets(data, '#tweets-container');
});