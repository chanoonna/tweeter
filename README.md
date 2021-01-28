# Tweeter Project

A simple single-page AJAX-based Twitter clone that uses jQuery, HTML5 and SASS.
This project is a part of bootcamp course which is focused on both front-end and back-end.

_**(BEWARE)**_ Even though it seems there is live tweet coming in, they are all fake and not real. It is only to practice with Server sent events.

!["Desktop view"](https://github.com/chanoonna/tweeter/blob/master/docs/tweeter1.png)
!["Tablet view"](https://github.com/chanoonna/tweeter/blob/master/docs/tweeter2.png)
!["Mobile phone view"](https://github.com/chanoonna/tweeter/blob/master/docs/tweeter3.png)
!["Disabled submit button when length exceeds 140"](https://github.com/chanoonna/tweeter/blob/master/docs/tweeter4.png)
!["When there is no input, it doesn't post"](https://github.com/chanoonna/tweeter/blob/master/docs/tweeter5.png)


## Dependencies

- node.js 14.15.x or above
- express
- body-parser
- chance
- jquery
- md5
- node-sass-middleware
- timeago

## Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the `npm install` command.
3. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
4. Go to <http://localhost:8080/> in your browser.

## Features

- Single-page design.
- Tweet reload using AJAX.
- Listens to Server sent new tweeter feed.
- Preponse to 3 major display devices: desktops, tablets and mobile phones.

## Known bugs

- Tweets get duplicated on rare occasions.
- App tries to listen to the server even when the connection is lost.

## Features in mind

- Server sending only new tweets to client instead of sending the whole database.
- Sign in, log in and log out feature with sessions.
- Retweeting
- Setting up a real database.